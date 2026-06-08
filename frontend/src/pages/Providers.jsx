import { useEffect, useState } from 'react'
import api from '../api'

export default function Providers() {

  const [providers, setProviders] = useState([])

  const [name, setName] = useState('')
  const [providerType, setProviderType] = useState('postgrid')
  const [apiKey, setApiKey] = useState('')
  const [apiSecret, setApiSecret] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function loadProviders() {

    try {

      const res =
        await api.get('/providers')

      setProviders(
        res.data.providers || []
      )

    } catch (error) {

      console.error(error)

    }

  }

  async function saveProvider() {

    try {

      await api.post(
        '/providers',
        {
          name,
          provider_type: providerType,
          api_key: apiKey,
          api_secret: apiSecret,
          username,
          password
        }
      )

      setName('')
      setApiKey('')
      setApiSecret('')
      setUsername('')
      setPassword('')

      await loadProviders()

    } catch (error) {

      console.error(error)

    }

  }

  useEffect(() => {

    loadProviders()

  }, [])

  return (

    <div>

      <h1>
        Providers
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
          Add Provider
        </h2>

        <input
          placeholder="Provider Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
        />

        <br /><br />

        <select
          value={providerType}
          onChange={(e) =>
            setProviderType(
              e.target.value
            )
          }
        >

          <option value="postgrid">
            PostGrid
          </option>

          <option value="click2mail">
            Click2Mail
          </option>

          <option value="mailform">
            Mailform
          </option>

          <option value="postalytics">
            Postalytics
          </option>

          <option value="docupost">
            Docupost
          </option>

        </select>

        <br /><br />

        <input
          placeholder="API Key"
          value={apiKey}
          onChange={(e) =>
            setApiKey(
              e.target.value
            )
          }
        />

        <br /><br />

        <input
          placeholder="API Secret"
          value={apiSecret}
          onChange={(e) =>
            setApiSecret(
              e.target.value
            )
          }
        />

        <br /><br />

        <input
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }
        />

        <br /><br />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <br /><br />

        <button
          onClick={
            saveProvider
          }
        >
          Save Provider
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
          Saved Providers
        </h2>

        <table
          width="100%"
        >

          <thead>

            <tr>

              <th>
                Name
              </th>

              <th>
                Type
              </th>

            </tr>

          </thead>

          <tbody>

            {

              providers.map(

                provider => (

                  <tr
                    key={provider.id}
                  >

                    <td>
                      {provider.name}
                    </td>

                    <td>
                      {provider.provider_type}
                    </td>

                  </tr>

                )

              )

            }

          </tbody>

        </table>

      </div>

    </div>

  )

}