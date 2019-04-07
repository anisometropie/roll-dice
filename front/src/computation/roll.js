export const rollDie = die => {
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

export const rollDice = (...dice) => {
  return dice.reduce((acc, cur) => [...acc, rollDie(cur)], [])
}
