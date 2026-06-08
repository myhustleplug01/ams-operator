const express = require('express')
const router = express.Router()
const db = require('../database')

// Get all providers
router.get('/providers', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM providers ORDER BY id DESC')
    res.json({ success: true, providers: result.rows })
  } catch (error) {
    console.error('PROVIDERS GET ERROR:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// Add a new provider
router.post('/providers', async (req, res) => {
  try {
    const { name, provider_type, api_key, api_secret, username, password, base_url } = req.body
    const result = await db.query(
      `INSERT INTO providers
        (name, provider_type, api_key, api_secret, username, password, base_url)
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        RETURNING *`,
      [name, provider_type, api_key, api_secret, username, password, base_url]
    )
    res.json({ success: true, provider: result.rows[0] })
  } catch (error) {
    console.error('PROVIDERS POST ERROR:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

module.exports = router