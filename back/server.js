const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const addPhrases = require('./controllers/addPhrases')
const fetchPhrasesToRevise = require('./controllers/fetchPhrasesToRevise')
const databaseStuff = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    }
  : {
      host: '127.0.0.1',
      user: 'ut',
      password: '123',
      database: 'duolingo',
    }
const knex = require('knex')({
  client: 'pg',
  connection: databaseStuff,
})

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.post('/addPhrases', addPhrases.handleAddPhrases(knex))
app.get(
  '/fetchPhrasesToRevise',
  fetchPhrasesToRevise.handleFetchPhrasesToRevise(knex)
)

app.listen(process.env.PORT || 3001, () => {
  console.log(`app is running on port ${process.env.PORT || 3001}`)
})
