import React, { Component } from 'react'
import './App.css'
import Map from './map'


class App extends Component {

  state = {
    venues: []
  }

  componentDidMount(){
      this.fourSquare()

  }

  fourSquare (){
    fetch('https://api.foursquare.com/v2/venues/explore?client_id=FBFR4MRSN5YJ34CQKWAN0RWG55X41LX0ILOLM5JW52T0ZMKP&client_secret=2NPKFK05BW3WOBENMIWPRPFKQEDBWLNGXX1ANW5YUFQ1QHLD&v=20180323&limit=30&near=brisbane&radius=1000&query=cinemas')
      .then(places=> places.json())
      .then(parsedJSON => {
        this.setState({ venues: parsedJSON.response.groups[0].items })
        console.log("the State", this.state);
      })
      .catch(error => console.log("oops"))
  }


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
