const express = require('express')
const router = express.Router()
const db = require('../database')

// Get letters for a campaign
router.get('/letters/:campaignId', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM letters WHERE campaign_id=$1 ORDER BY id DESC',
      [req.params.campaignId]
    )
    res.json({ success: true, letters: result.rows })
  } catch (error) {
    console.error('LETTERS GET ERROR:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

module.exports = router