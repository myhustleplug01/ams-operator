import { useEffect, useState } from 'react'
import api from '../api'

export default function Templates() {

const [templates, setTemplates] = useState([])

const [name, setName] = useState('')

const [html, setHtml] =
useState('')

async function loadTemplates() {

const res =
  await api.get(
    '/templates'
  )

setTemplates(
  res.data.templates || []
)

}

async function createTemplate() {

await api.post(
  '/templates',
  {
    name,
    html_content: html
  }
)

setName('')
setHtml('')

loadTemplates()

}

useEffect(() => {

loadTemplates()

}, [])

return (

<div>

  <h1>
    Templates
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
      Create Template
    </h2>

    <input
      placeholder="Template Name"
      value={name}
      onChange={(e) =>
        setName(
          e.target.value
        )
      }
    />

    <br /><br />

    <textarea

      rows="12"

      style={{
        width: '100%'
      }}

      value={html}

      onChange={(e) =>
        setHtml(
          e.target.value
        )
      }

    />

    <br /><br />

    <button
      onClick={
        createTemplate
      }
    >
      Save Template
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
      Saved Templates
    </h2>

    {

      templates.map(

        template => (

          <div
            key={template.id}
          >

            {template.name}

            <hr />

          </div>

        )

      )

    }

  </div>

</div>

)

}