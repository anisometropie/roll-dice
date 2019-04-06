import React from 'react'
import Die from './Die'
import './Dice.css'

const DiceRow = ({ roll }) => {
  const rollJSX = roll.map((value, index) => <Die key={index} value={value} />)
  return <div className="diceRow">{rollJSX}</div>
}

export default DiceRow
