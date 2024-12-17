const express = require('express')
const cors = require('cors')
const app = express()
const port = 9999

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', require('./src/routes'))

app.listen(port, () => {
    console.log("Web host: http://localhost:" + port)
})