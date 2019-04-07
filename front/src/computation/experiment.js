import { isEqual, find, sortBy } from 'lodash'
import { rollDice } from './roll'

export const runExperiment = (dice, numberOfRolls) => {
  let results = []
  for (let i = 0; i < numberOfRolls; i++) {
    const roll = rollDice(...dice).sort()
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
  return { resultsByRoll, resultsByCount }
}
