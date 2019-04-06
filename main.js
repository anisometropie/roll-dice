const util = require('util')
const { gcd } = require('./math.js')
const { get, isEqual, find, sortBy } = require('lodash')
const { red, blue, olive, yellow, magenta, normal } = require('./dice.js')
const { runExperiment } = require('./experiment.js')
const { rollDie, rollDice } = require('./roll.js')

const dice = [
  red,
  red,
  blue,
  blue,
  olive,
  olive,
  yellow,
  yellow,
  magenta,
  magenta
]

const blues = [blue, blue]
const ym = [yellow, yellow, magenta, magenta]

const { resultsByRoll, resultsByCount } = runExperiment(ym, 100000)

// console.log(util.inspect(resultsByRoll, { maxArrayLength: null }))
// console.log('')
console.log(util.inspect(resultsByCount, { maxArrayLength: null }))
// console.log(
//   find(resultsByRoll, result =>
//     isEqual(result.roll, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
//   )
// )
