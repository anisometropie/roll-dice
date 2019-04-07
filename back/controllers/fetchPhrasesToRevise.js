const { isArray } = require('lodash')

const handleFetchPhrasesToRevise = knex => (req, res) => {
  let response = {}
  knex
    .select('*')
    .from('phrases')
    .where('next_repetition', '<=', 'now()')
    .then(data => {
      console.log(data)
      res.status(200).json(data)
    })
    .catch(err => {
      console.dir(err)
      res.status(500).json()
    })
}

module.exports = { handleFetchPhrasesToRevise }
