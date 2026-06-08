import { useEffect, useState } from 'react'
import api from '../api'

export default function Campaigns() {

const [campaigns, setCampaigns] = useState([])

const [providers, setProviders] = useState([])
const [lists, setLists] = useState([])
const [templates, setTemplates] = useState([])

const [name, setName] = useState('')
const [providerId, setProviderId] = useState('')
const [listId, setListId] = useState('')
const [templateId, setTemplateId] = useState('')

async function loadData() {

try {

  const [
    campaignsRes,
    providersRes,
    listsRes,
    templatesRes
  ] = await Promise.all([

    api.get('/campaigns'),
    api.get('/providers'),
    api.get('/lists'),
    api.get('/templates')

  ])

  setCampaigns(
    campaignsRes.data.campaigns || []
  )

  setProviders(
    providersRes.data.providers || []
  )

  setLists(
    listsRes.data.lists || []
  )

  setTemplates(
    templatesRes.data.templates || []
  )

} catch (error) {

  console.error(error)

}

}

async function createCampaign() {

try {

  await api.post(
    '/campaigns',
    {
      name,
      provider_id: providerId,
      list_id: listId,
      template_id: templateId
    }
  )

  setName('')
  setProviderId('')
  setListId('')
  setTemplateId('')

  loadData()

} catch (error) {

  console.error(error)

  alert(
    'Failed to create campaign'
  )

}

}

async function sendCampaign(id) {

try {

  await api.post(
    `/campaigns/send/${id}`
  )

  alert(
    'Campaign Sent'
  )

  loadData()

} catch (error) {

  console.error(error)

  alert(
    'Campaign Send Failed'
  )

}

}

useEffect(() => {

loadData()

}, [])

return (

<div>

  <h1>
    Campaigns
  </h1>

  <div
    style={{
      background: 'white',
      padding: '20px',
      borderRadius: '10px',
      marginBottom: '20px'
    }}
  >

    <h2>
      Create Campaign
    </h2>

    <input
      placeholder="Campaign Name"
      value={name}
      onChange={(e) =>
        setName(
          e.target.value
        )
      }
    />

    <br /><br />

    <select
      value={providerId}
      onChange={(e) =>
        setProviderId(
          e.target.value
        )
      }
    >

      <option value="">
        Select Provider
      </option>

      {

        providers.map(

          provider => (

            <option
              key={provider.id}
              value={provider.id}
            >

              {provider.name}

            </option>

          )

        )

      }

    </select>

    <br /><br />

    <select
      value={listId}
      onChange={(e) =>
        setListId(
          e.target.value
        )
      }
    >

      <option value="">
        Select List
      </option>

      {

        lists.map(

          list => (

            <option
              key={list.id}
              value={list.id}
            >

              {list.name}

            </option>

          )

        )

      }

    </select>

    <br /><br />

    <select
      value={templateId}
      onChange={(e) =>
        setTemplateId(
          e.target.value
        )
      }
    >

      <option value="">
        Select Template
      </option>

      {

        templates.map(

          template => (

            <option
              key={template.id}
              value={template.id}
            >

              {template.name}

            </option>

          )

        )

      }

    </select>

    <br /><br />

    <button
      onClick={
        createCampaign
      }
    >

      Create Campaign

    </button>

  </div>

  <div
    style={{
      background: 'white',
      padding: '20px',
      borderRadius: '10px'
    }}
  >

    <h2>
      Existing Campaigns
    </h2>

    {

      campaigns.length === 0

      ?

      <p>
        No campaigns found
      </p>

      :

      campaigns.map(

        campaign => (

          <div
            key={campaign.id}
            style={{
              borderBottom:
              '1px solid #ddd',
              paddingBottom:
              '15px',
              marginBottom:
              '15px'
            }}
          >

            <strong>
              {campaign.name}
            </strong>

            <br />

            Status:
            {' '}
            {campaign.status || 'Draft'}

            <br />

            Total Contacts:
            {' '}
            {campaign.total_contacts || 0}

            <br /><br />

            <button
              onClick={() =>
                sendCampaign(
                  campaign.id
                )
              }
            >

              Send Campaign

            </button>

          </div>

        )

      )

    }

  </div>

</div>

)

}