require('dotenv').config()
const { Pool } = require('pg')

console.log('DATABASE_URL:', process.env.DATABASE_URL)

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

pool.on('connect', () => console.log('PostgreSQL Connected'))
pool.on('error', err => console.error('PostgreSQL Error:', err))

async function query(text, params = []) {
  return pool.query(text, params)
}

module.exports = { pool, query }