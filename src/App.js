import React, { Component } from 'react'
import './App.css'
import Map from './map'


class App extends Component {
  render() {
    return (
      <div className="main">
        <h1>Hello Cinema</h1>
        <Map />
      </div>
    )
  }
}

export default App;
