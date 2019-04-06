import React from 'react'
import Roll from 'components/Roll'
import 'App.css'

class App extends React.Component {
  render() {
    return (
      <div className="mainContainer">
        <h1>Dice</h1>
        <Roll />
      </div>
    )
  }
}

export default App
