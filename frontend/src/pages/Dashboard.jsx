import { useEffect, useState } from 'react'
import api from '../api'

export default function Dashboard() {

  const [stats, setStats] = useState({
    total_providers: 0,
    total_lists: 0,
    total_contacts: 0,
    total_templates: 0,
    total_campaigns: 0,
    total_letters: 0
  })

  const [recentLists, setRecentLists] = useState([])
  const [recentCampaigns, setRecentCampaigns] = useState([])

  async function loadStats() {
    try {
      const res = await api.get('/dashboard')
      setStats(res.data.stats)
      setRecentLists(res.data.recent_lists || [])
      setRecentCampaigns(res.data.recent_campaigns || [])
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    loadStats()
  }, [])

  return (
    <div>
      <h1>Dashboard</h1>

      <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', flex: '1 1 150px' }}>
          <h3>Total Providers</h3>
          <p>{stats.total_providers}</p>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', flex: '1 1 150px' }}>
          <h3>Total Lists</h3>
          <p>{stats.total_lists}</p>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', flex: '1 1 150px' }}>
          <h3>Total Contacts</h3>
          <p>{stats.total_contacts}</p>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', flex: '1 1 150px' }}>
          <h3>Total Templates</h3>
          <p>{stats.total_templates}</p>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', flex: '1 1 150px' }}>
          <h3>Total Campaigns</h3>
          <p>{stats.total_campaigns}</p>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', flex: '1 1 150px' }}>
          <h3>Total Letters</h3>
          <p>{stats.total_letters}</p>
        </div>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h2>Recent Lists</h2>
        {recentLists.length === 0 ? (
          <p>No recent lists</p>
        ) : (
          <ul>
            {recentLists.map(list => (
              <li key={list.id}>{list.name} ({list.total_contacts || 0} contacts)</li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ marginTop: '30px' }}>
        <h2>Recent Campaigns</h2>
        {recentCampaigns.length === 0 ? (
          <p>No recent campaigns</p>
        ) : (
          <ul>
            {recentCampaigns.map(c => (
              <li key={c.id}>{c.name} - Status: {c.status || 'Draft'}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}