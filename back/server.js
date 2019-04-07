const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const compute = require('./controllers/handleCompute')
// const databaseStuff = process.env.DATABASE_URL
//   ? {
//       connectionString: process.env.DATABASE_URL,
//       ssl: true
//     }
//   : {
//       host: '127.0.0.1',
//       user: 'ut',
//       password: '123',
//       database: 'duolingo'
//     }
// const knex = require('knex')({
//   client: 'pg',
//   connection: databaseStuff
// })

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.post('/compute', compute.handleCompute)

app.listen(process.env.PORT || 3001, () => {
  console.log(`app is running on port ${process.env.PORT || 3001}`)
})
