import { useEffect, useState } from 'react'
import api from '../api'

export default function Contacts() {

const [lists, setLists] =
useState([])

const [selectedList, setSelectedList] =
useState('')

const [contacts, setContacts] =
useState([])

async function loadLists() {

const res =
  await api.get('/lists')

setLists(
  res.data.lists || []
)

}

async function loadContacts(id) {

if (!id)
  return

const res =
  await api.get(
    `/contacts/${id}`
  )

setContacts(
  res.data.contacts || []
)

}

useEffect(() => {

loadLists()

}, [])

return (

<div>

  <h1>
    Contacts
  </h1>

  <div
    style={{
      background: 'white',
      padding: '20px',
      borderRadius: '10px'
    }}
  >

    <h2>
      Select List
    </h2>

    <select

      value={selectedList}

      onChange={(e) => {

        setSelectedList(
          e.target.value
        )

        loadContacts(
          e.target.value
        )

      }}

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

  </div>

  <br />

  <div
    style={{
      background: 'white',
      padding: '20px',
      borderRadius: '10px'
    }}
  >

    <h2>
      Contacts
    </h2>

    {

      contacts.map(

        contact => (

          <div
            key={contact.id}
          >

            <strong>

              {contact.first_name}
              {' '}
              {contact.last_name}

            </strong>

            <br />

            {contact.address1}

            <br />

            {contact.city}
            {' '}
            {contact.state}

            <hr />

          </div>

        )

      )

    }

  </div>

</div>

)

}