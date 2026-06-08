import { useEffect, useState } from 'react'
import api from '../api'

export default function Lists() {

const [lists, setLists] = useState([])

const [name, setName] = useState('')
const [description, setDescription] = useState('')

async function loadLists() {

const res =
  await api.get('/lists')

setLists(
  res.data.lists || []
)

}

async function createList() {

await api.post(
  '/lists',
  {
    name,
    description
  }
)

setName('')
setDescription('')

loadLists()

}

useEffect(() => {

loadLists()

}, [])

return (

<div>

  <h1>
    Lists
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
      Create List
    </h2>

    <input
      placeholder="List Name"
      value={name}
      onChange={(e) =>
        setName(
          e.target.value
        )
      }
    />

    <br /><br />

    <input
      placeholder="Description"
      value={description}
      onChange={(e) =>
        setDescription(
          e.target.value
        )
      }
    />

    <br /><br />

    <button
      onClick={
        createList
      }
    >
      Save List
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
      Saved Lists
    </h2>

    {

      lists.map(

        list => (

          <div
            key={list.id}
          >

            <strong>
              {list.name}
            </strong>

            <br />

            {list.description}

            <hr />

          </div>

        )

      )

    }

  </div>

</div>

)

}