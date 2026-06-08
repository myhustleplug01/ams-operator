const express = require('express')
const router = express.Router()
const db = require('../database')

// Get all templates
router.get('/templates', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM templates ORDER BY id DESC')
    res.json({ success: true, templates: result.rows })
  } catch (error) {
    console.error('TEMPLATES GET ERROR:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// Create a new template
router.post('/templates', async (req, res) => {
  try {
    const { name, html_content } = req.body
    const result = await db.query(
      `INSERT INTO templates (name, html_content) VALUES ($1,$2) RETURNING *`,
      [name, html_content]
    )
    res.json({ success: true, template: result.rows[0] })
  } catch (error) {
    console.error('TEMPLATES POST ERROR:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

module.exports = router