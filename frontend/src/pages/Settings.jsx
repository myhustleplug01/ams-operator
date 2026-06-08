import { useState } from 'react'

export default function Settings() {

const [backendUrl, setBackendUrl] =
useState(
'http://localhost:5000'
)

return (

<div>

  <h1>
    Settings
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
      Application Settings
    </h2>

    <label>
      Backend URL
    </label>

    <br />

    <input
      value={backendUrl}
      onChange={(e) =>
        setBackendUrl(
          e.target.value
        )
      }
      style={{
        width: '100%'
      }}
    />

    <br /><br />

    <button>

      Save Settings

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
      Installed Providers
    </h2>

    <ul>

      <li>
        PostGrid
      </li>

      <li>
        Click2Mail
      </li>

      <li>
        Mailform
      </li>

      <li>
        Postalytics
      </li>

      <li>
        Docupost
      </li>

    </ul>

  </div>

</div>

)

}