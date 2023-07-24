const express = require('express')
const cors = require('cors')

const connectToMongo = require('./db')

connectToMongo()

const app = express()
const port = 4000

app.use(express.json()) // if a request has a Content-Type header set to application/json and includes a valid JSON payload, the middleware will parse the JSON and make it available in req.body for subsequent handling.

app.use(cors()) // To fix the issue where we cant make fetch request through the browser to local host

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
}) 



