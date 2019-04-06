import React from 'react'
import { isEqual, find } from 'lodash'
import { gcd } from 'computation/math.js'
import { red, blue, olive, yellow, magenta, normal } from 'computation/dice.js'
import { runExperiment } from 'computation/experiment.js'
import DiceRow from 'components/DiceRow'
import './Roll.css'

class Roll extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      resultsByRoll: [],
      resultsByCount: [],
      dice: [
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
      ],
      numberOfRolls: 100000
    }
  }

  roll = () => {
    const { dice, numberOfRolls } = this.state
    const { resultsByRoll, resultsByCount } = runExperiment(dice, numberOfRolls)
    this.setState({
      resultsByRoll,
      resultsByCount
    })
    console.log(resultsByCount)
  }

  render() {
    const { resultsByCount, numberOfRolls } = this.state
    const resultsJSX = resultsByCount.map((result, index) => (
      <div className="result">
        <div>{`${result.count}/${numberOfRolls} (${(100 * result.count) /
          numberOfRolls} %)`}</div>
        <DiceRow key={index} roll={result.roll} />
      </div>
    ))
    return (
      <div>
        <button onClick={this.roll}>Roll</button>
        <div>{resultsJSX}</div>
      </div>
    )
  }
}

export default Roll
