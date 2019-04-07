const { isArray, isEmpty } = require('lodash')

const handleAddPhrases = knex => (req, res) => {
  let {
    newPhrases,
    translations,
    initialEaseFactor,
    firstRepetitionInterval
  } = req.body
  let response = {}
  if (!isArray(newPhrases) || !isArray(translations)) {
    res.status(400).json({ message: 'Bad input type' })
  } else if (newPhrases.length !== translations.length) {
    res.status(400).json({
      message: 'Phrases and translations should have the same number of lines'
    })
  } else {
    const next_repetition = new Date()
    next_repetition.setDate(next_repetition.getDate() + firstRepetitionInterval)
    const checkedPhrasesPromises = newPhrases.map((phrase, index) => {
      return knex
        .select('original', 'translation')
        .from('phrases')
        .where({
          original: phrase,
          translation: translations[index]
        })
        .then(existingPhrases => {
          if (isEmpty(existingPhrases)) {
            return {
              original: phrase,
              translation: translations[index],
              username: 'none',
              ease_factor: initialEaseFactor,
              next_repetition,
              number_of_repetition: 0
            }
          } else {
            return {
              original: phrase,
              translation: translations[index],
              alreadyExists: true
            }
          }
        })
    })
    Promise.all(checkedPhrasesPromises).then(phrases => {
      const phrasesToAdd = phrases.filter(phrase => !phrase.alreadyExists)
      const alreadyExisting = phrases.filter(phrase => phrase.alreadyExists)
      if (!isEmpty(phrasesToAdd)) {
        knex
          .insert(phrasesToAdd)
          .into('phrases')
          .then(() => {
            res.status(200).json({
              message: `Phrases successfully added`,
              added: phrasesToAdd,
              alreadyExisting
            })
          })
          .catch(err => {
            console.dir(err)
            res.status(500).json(err)
          })
      } else {
        res.status(202).json({ message: 'No new phrase to add' })
      }
    })
  }
}

module.exports = { handleAddPhrases }
