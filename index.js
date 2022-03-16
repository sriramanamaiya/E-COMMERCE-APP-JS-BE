const express = require('express')
const app = express()
const configureDB = require('./config/database')
configureDB()
const route = require('./config/route')
const port = 3035

// configuration - enable express to parse incoming json data
app.use(express.json())
app.use('/api', route)

app.listen(port, () => {
    console.log('SERVER IS RUNNING ON PORT', port)
})
