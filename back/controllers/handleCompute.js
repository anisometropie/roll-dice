const { isArray, isEmpty } = require('lodash')
const { runExperiment } = require('../compute/experiment.js')

const handleCompute = (req, res) => {
  let { dice, numberOfRolls } = req.body
  const { resultsByRoll, resultsByCount } = runExperiment(dice, numberOfRolls)
  res.status(200).json({
    message: 'computation was successful',
    resultsByRoll,
    resultsByCount
  })
}

module.exports = { handleCompute }
