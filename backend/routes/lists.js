const express = require('express')
const router = express.Router()
const db = require('../database')

// Get all contact lists
router.get('/lists', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM contact_lists ORDER BY id DESC')
    res.json({ success: true, lists: result.rows })
  } catch (error) {
    console.error('LISTS GET ERROR:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// Create a new contact list
router.post('/lists', async (req, res) => {
  try {
    const { name, description } = req.body
    const result = await db.query(
      `INSERT INTO contact_lists (name, description) VALUES ($1,$2) RETURNING *`,
      [name, description]
    )
    res.json({ success: true, list: result.rows[0] })
  } catch (error) {
    console.error('LISTS POST ERROR:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

module.exports = router