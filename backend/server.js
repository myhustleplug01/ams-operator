require('dotenv').config()

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const providerRoutes = require('./routes/providers')
const listRoutes = require('./routes/lists')
const contactRoutes = require('./routes/contacts')
const templateRoutes = require('./routes/templates')
const campaignRoutes = require('./routes/campaigns')
const letterRoutes = require('./routes/letters')

const app = express()

app.use(helmet())
app.use(cors())

app.use(express.json({
limit: '20mb'
}))

app.use(express.urlencoded({
extended: true
}))

app.get('/', (req, res) => {

res.json({

success: true,

app: 'AMS Operator',

version: '1.0.0'

})

})

app.get('/health', (req, res) => {

res.json({

success: true,

uptime: process.uptime()

})

})

app.use('/api', providerRoutes)
app.use('/api', listRoutes)
app.use('/api', contactRoutes)
app.use('/api', templateRoutes)
app.use('/api', campaignRoutes)
app.use('/api', letterRoutes)

app.use((err, req, res, next) => {

console.error(err)

res.status(500).json({

success: false,

error: err.message

})

})

const PORT =
process.env.PORT || 5000

app.listen(PORT, () => {

console.log(

`AMS Operator running on ${PORT}`

)

})