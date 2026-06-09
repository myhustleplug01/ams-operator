const express = require('express')
const router = express.Router()
const db = require('../database')

// Get all providers
router.get('/providers', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM providers ORDER BY id DESC'
    )

    res.json({
      success: true,
      providers: result.rows
    })
  } catch (error) {
    console.error('PROVIDERS GET ERROR:', error)

    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

// Get single provider
router.get('/providers/:id', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM providers WHERE id = $1',
      [req.params.id]
    )

    if (!result.rows.length) {
      return res.status(404).json({
        success: false,
        error: 'Provider not found'
      })
    }

    res.json({
      success: true,
      provider: result.rows[0]
    })
  } catch (error) {
    console.error('PROVIDER GET ERROR:', error)

    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

// Create provider
router.post('/providers', async (req, res) => {
  try {
    const {
      name,
      provider_type,
      api_key,
      api_secret,
      username,
      password,
      base_url,
      is_active
    } = req.body

    const result = await db.query(
      `INSERT INTO providers
      (
        name,
        provider_type,
        api_key,
        api_secret,
        username,
        password,
        base_url,
        is_active
      )
      VALUES
      ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *`,
      [
        name,
        provider_type,
        api_key || null,
        api_secret || null,
        username || null,
        password || null,
        base_url || null,
        is_active !== false
      ]
    )

    res.json({
      success: true,
      provider: result.rows[0]
    })
  } catch (error) {
    console.error('PROVIDER POST ERROR:', error)

    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

// Update provider
router.put('/providers/:id', async (req, res) => {
  try {
    const {
      name,
      provider_type,
      api_key,
      api_secret,
      username,
      password,
      base_url,
      is_active
    } = req.body

    const result = await db.query(
      `UPDATE providers
       SET
         name = $1,
         provider_type = $2,
         api_key = $3,
         api_secret = $4,
         username = $5,
         password = $6,
         base_url = $7,
         is_active = $8
       WHERE id = $9
       RETURNING *`,
      [
        name,
        provider_type,
        api_key,
        api_secret,
        username,
        password,
        base_url,
        is_active,
        req.params.id
      ]
    )

    if (!result.rows.length) {
      return res.status(404).json({
        success: false,
        error: 'Provider not found'
      })
    }

    res.json({
      success: true,
      provider: result.rows[0]
    })
  } catch (error) {
    console.error('PROVIDER UPDATE ERROR:', error)

    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

// Delete provider
router.delete('/providers/:id', async (req, res) => {
  try {
    const result = await db.query(
      'DELETE FROM providers WHERE id = $1 RETURNING *',
      [req.params.id]
    )

    if (!result.rows.length) {
      return res.status(404).json({
        success: false,
        error: 'Provider not found'
      })
    }

    res.json({
      success: true,
      message: 'Provider deleted'
    })
  } catch (error) {
    console.error('PROVIDER DELETE ERROR:', error)

    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

// Toggle provider active status
router.patch('/providers/:id/toggle', async (req, res) => {
  try {
    const result = await db.query(
      `UPDATE providers
       SET is_active = NOT is_active
       WHERE id = $1
       RETURNING *`,
      [req.params.id]
    )

    if (!result.rows.length) {
      return res.status(404).json({
        success: false,
        error: 'Provider not found'
      })
    }

    res.json({
      success: true,
      provider: result.rows[0]
    })
  } catch (error) {
    console.error('PROVIDER TOGGLE ERROR:', error)

    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

module.exports = router