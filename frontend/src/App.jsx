import {
BrowserRouter,
Routes,
Route
}
from 'react-router-dom'

import Sidebar
from './components/Sidebar'

import Dashboard
from './pages/Dashboard'

import Providers
from './pages/Providers'

import Lists
from './pages/Lists'

import Contacts
from './pages/Contacts'

import Templates
from './pages/Templates'

import Campaigns
from './pages/Campaigns'

import Letters
from './pages/Letters'

import Settings
from './pages/Settings'

export default function App() {

return (

<BrowserRouter>

  <div
    style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#f5f5f5'
    }}
  >

    <Sidebar />

    <div
      style={{
        flex: 1,
        padding: '20px'
      }}
    >

      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/providers"
          element={<Providers />}
        />

        <Route
          path="/lists"
          element={<Lists />}
        />

        <Route
          path="/contacts"
          element={<Contacts />}
        />

        <Route
          path="/templates"
          element={<Templates />}
        />

        <Route
          path="/campaigns"
          element={<Campaigns />}
        />

        <Route
          path="/letters"
          element={<Letters />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

      </Routes>

    </div>

  </div>

</BrowserRouter>

)

}