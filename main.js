const util = require('util')
const { gcd } = require('./math.js')
const { red, blue, olive, yellow, magenta, normal } = require('./dice.js')
const { get, isEqual, find, sortBy } = require('lodash')

const rollDie = die => {
  const rand = Math.random()
  let result
  die.reduce((acc, cur) => {
    const currentProba = acc + cur.proba
    if (acc <= rand && rand < currentProba) {
      result = cur.value
    }
    return currentProba
  }, 0)
  return result
}

rollDice = (...dice) => {
  return dice.reduce((acc, cur) => [...acc, rollDie(cur)], [])
}

let results = []
for (let i = 0; i < 1000000; i++) {
  // const roll = rollDice(normal, normal, normal, normal, normal).sort()
  const roll = rollDice(
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
  ).sort()
  let result = find(results, result => isEqual(result.roll, roll)) || {
    roll,
    count: 0
  }
  result.count++
  if (result.count === 1) {
    results.push(result)
  }
}

const resultsByRoll = sortBy(results, 'roll')
const resultsByCount = sortBy(results, 'count')

console.log(util.inspect(resultsByRoll, { maxArrayLength: null }))
console.log('')
console.log(util.inspect(resultsByCount, { maxArrayLength: null }))
console.log(
  find(results, result => isEqual(result.roll, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]))
)
