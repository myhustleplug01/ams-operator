import { Link } from 'react-router-dom'

export default function Sidebar() {

return (

<div
  style={{
    width: '250px',
    background: '#111827',
    color: 'white',
    minHeight: '100vh',
    padding: '20px'
  }}
>

  <h2>
    AMS Operator
  </h2>

  <nav
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      marginTop: '30px'
    }}
  >

    <Link
      to="/"
      style={{ color: 'white' }}
    >
      Dashboard
    </Link>

    <Link
      to="/providers"
      style={{ color: 'white' }}
    >
      Providers
    </Link>

    <Link
      to="/lists"
      style={{ color: 'white' }}
    >
      Lists
    </Link>

    <Link
      to="/contacts"
      style={{ color: 'white' }}
    >
      Contacts
    </Link>

    <Link
      to="/templates"
      style={{ color: 'white' }}
    >
      Templates
    </Link>

    <Link
      to="/campaigns"
      style={{ color: 'white' }}
    >
      Campaigns
    </Link>

    <Link
      to="/letters"
      style={{ color: 'white' }}
    >
      Letters
    </Link>

    <Link
      to="/settings"
      style={{ color: 'white' }}
    >
      Settings
    </Link>

  </nav>

</div>

)

}