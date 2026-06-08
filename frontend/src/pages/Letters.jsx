import { useState } from 'react'
import api from '../api'

export default function Letters() {

const [campaignId, setCampaignId] =
useState('')

const [letters, setLetters] =
useState([])

async function loadLetters() {

if (!campaignId)
  return

const res =
  await api.get(
    `/letters/${campaignId}`
  )

setLetters(
  res.data.letters || []
)

}

return (

<div>

  <h1>
    Letters
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
      Load Campaign Letters
    </h2>

    <input
      placeholder="Campaign ID"
      value={campaignId}
      onChange={(e) =>
        setCampaignId(
          e.target.value
        )
      }
    />

    <br /><br />

    <button
      onClick={
        loadLetters
      }
    >

      Load Letters

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
      Results
    </h2>

    {

      letters.map(

        letter => (

          <div
            key={letter.id}
          >

            <strong>

              Letter #
              {letter.id}

            </strong>

            <br />

            Status:
            {' '}
            {letter.status}

            <br />

            Provider ID:
            {' '}
            {letter.provider_letter_id}

            <hr />

          </div>

        )

      )

    }

  </div>

</div>

)

}