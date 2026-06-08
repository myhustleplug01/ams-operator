const db = require('../database')
const { getProvider } = require('./provider-manager')

// Send a campaign
async function sendCampaign(campaignId) {
  // Fetch campaign info
  const campaignResult = await db.query(
    'SELECT * FROM campaigns WHERE id=$1',
    [campaignId]
  )
  if (!campaignResult.rows.length) throw new Error('Campaign not found')
  const campaign = campaignResult.rows[0]

  // Fetch template
  const templateResult = await db.query(
    'SELECT * FROM templates WHERE id=$1',
    [campaign.template_id]
  )
  if (!templateResult.rows.length) throw new Error('Template not found')
  const template = templateResult.rows[0]

  // Fetch contacts
  const contactsResult = await db.query(
    'SELECT * FROM contacts WHERE list_id=$1',
    [campaign.list_id]
  )
  const contacts = contactsResult.rows

  if (!contacts.length) throw new Error('No contacts to send')

  // Fetch provider adapter
  const providerResult = await db.query(
    'SELECT * FROM providers WHERE id=$1',
    [campaign.provider_id]
  )
  if (!providerResult.rows.length) throw new Error('Provider not found')
  const providerConfig = providerResult.rows[0]
  const provider = getProvider(providerConfig.provider_type.toLowerCase())

  // Send letters
  for (const contact of contacts) {
    const payload = {
      contact,
      template,
      campaignId,
      providerConfig
    }
    const response = await provider.sendLetter(providerConfig, payload)

    await db.query(
      `INSERT INTO letters (campaign_id, contact_id, provider_letter_id, status, provider_response)
       VALUES ($1,$2,$3,$4,$5)`,
      [
        campaignId,
        contact.id,
        response.id || null,
        response.success ? 'Sent' : 'Failed',
        JSON.stringify(response)
      ]
    )
  }

  // Update campaign status
  await db.query(
    'UPDATE campaigns SET status=$1 WHERE id=$2',
    ['Completed', campaignId]
  )

  return { success: true, total: contacts.length }
}

module.exports = { sendCampaign }