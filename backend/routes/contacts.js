const express = require('express')
const router = express.Router()
const db = require('../database')
const multer = require('multer')
const csv = require('csv-parser')
const fs = require('fs')

const upload = multer({ dest: 'uploads/' })

// Get contacts for a list
router.get('/contacts/:listId', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM contacts WHERE list_id=$1 ORDER BY id DESC',
      [req.params.listId]
    )
    res.json({ success: true, contacts: result.rows })
  } catch (error) {
    console.error('CONTACTS GET ERROR:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// Upload contacts CSV for a list
router.post('/contacts/upload/:listId', upload.single('file'), async (req, res) => {
  try {
    const rows = []
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (row) => rows.push(row))
      .on('end', async () => {
        for (const row of rows) {
          await db.query(
            `INSERT INTO contacts (list_id, first_name, last_name, company, address1, address2, city, state, zip, country, email, phone) 
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
            [
              req.params.listId,
              row.first_name,
              row.last_name,
              row.company,
              row.address1,
              row.address2,
              row.city,
              row.state,
              row.zip,
              row.country,
              row.email,
              row.phone
            ]
          )
        }
        res.json({ success: true, imported: rows.length })
      })
  } catch (error) {
    console.error('CONTACTS UPLOAD ERROR:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

module.exports = router