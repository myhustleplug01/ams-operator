const express = require('express')
const router = express.Router()
const db = require('../database')
const { getProvider } = require('../services/provider-manager')

// Get all campaigns
router.get('/campaigns', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM campaigns ORDER BY id DESC')
    res.json({ success: true, campaigns: result.rows })
  } catch (error) {
    console.error('CAMPAIGNS GET ERROR:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// Create a new campaign
router.post('/campaigns', async (req, res) => {
  try {
    const { name, provider_id, template_id, list_id } = req.body
    const countResult = await db.query('SELECT COUNT(*) FROM contacts WHERE list_id=$1', [list_id])
    const total_contacts = Number(countResult.rows[0].count)
    const result = await db.query(
      `INSERT INTO campaigns (name, provider_id, template_id, list_id, total_contacts) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [name, provider_id, template_id, list_id, total_contacts]
    )
    res.json({ success: true, campaign: result.rows[0] })
  } catch (error) {
    console.error('CAMPAIGNS POST ERROR:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// Send a campaign
router.post('/campaigns/send/:id', async (req, res) => {
  try {
    const campaignResult = await db.query('SELECT * FROM campaigns WHERE id=$1', [req.params.id])
    if (!campaignResult.rows.length) throw new Error('Campaign not found')
    const campaign = campaignResult.rows[0]

    const contactsResult = await db.query('SELECT * FROM contacts WHERE list_id=$1', [campaign.list_id])
    const contacts = contactsResult.rows
    if (!contacts.length) throw new Error('No contacts to send')

    const providerResult = await db.query('SELECT * FROM providers WHERE id=$1', [campaign.provider_id])
    if (!providerResult.rows.length) throw new Error('Provider not found')
    const providerConfig = providerResult.rows[0]
    const provider = getProvider(providerConfig.provider_type.toLowerCase())

    for (const contact of contacts) {
      const payload = { contact, campaignId: campaign.id, providerConfig }
      const response = await provider.sendLetter(providerConfig, payload)
      await db.query(
        `INSERT INTO letters (campaign_id, contact_id, provider_letter_id, status, provider_response)
         VALUES ($1,$2,$3,$4,$5)`,
        [
          campaign.id,
          contact.id,
          response.id || null,
          response.success ? 'Sent' : 'Failed',
          JSON.stringify(response)
        ]
      )
    }

    await db.query('UPDATE campaigns SET status=$1 WHERE id=$2', ['Completed', campaign.id])
    res.json({ success: true, total: contacts.length })

  } catch (error) {
    console.error('SEND CAMPAIGN ERROR:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

module.exports = router