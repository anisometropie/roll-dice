const { get } = require("lodash");
const { red, normal } = require("./dice.js");
const { gcd } = require("math.js");

const rollDie = die => {
  const rand = Math.random();
  let result;
  die.reduce((acc, cur) => {
    const currentProba = acc + cur.proba;
    if (acc <= rand && rand < currentProba) {
      result = cur.value;
    }
    return currentProba;
  }, 0);
  return result;
};

let result = {};
for (let i = 0; i < 100; i++) {
  const roll = rollDie(red);
  result[roll] = get(result, roll, 0) + 1;
}
console.log(result);
