import React, { Component } from 'react'
import './App.css'
import MyMap from './mymap'


class App extends Component {

  state = {
    allCinemas: [],
    allMarkers: []
  }

  // Call fourSquare API to get the raw data about my cinemas
  componentDidMount(){
      this.fourSquare()
  }

  fourSquare (){
    fetch('https://api.foursquare.com/v2/venues/explore?client_id=FBFR4MRSN5YJ34CQKWAN0RWG55X41LX0ILOLM5JW52T0ZMKP&client_secret=2NPKFK05BW3WOBENMIWPRPFKQEDBWLNGXX1ANW5YUFQ1QHLD&v=20180323&limit=30&near=brisbane&radius=1000&query=cinemas')
      .then(places=> places.json())
      .then(parsedJSON => {
        //Get allCinemas
        this.setState({ allCinemas: parsedJSON.response.groups[0].items })
        //Get allMarkers
        this.createMarkers(this.state.allCinemas)
      })
      .catch(error => console.log("oops"))
  }

  //Create Markers
  createMarkers(cinemas){
    let allMarkers = []
      cinemas.map( cinema => {
        let marker = {
          id: '',
          name: '',
          location: {
            lat: 0,
            lng: 0
          }
        }
      marker.id = cinema.venue.id
      marker.name = cinema.venue.name
      marker.location.lat = cinema.venue.location.lat
      marker.location.lng = cinema.venue.location.lng
      return allMarkers.push(marker)
    })
    this.setState({ allMarkers })
  }

  render() {
    return (
      <div className="main">
        <h1>Hello Cinema</h1>
        <MyMap allMarkers={this.state.allMarkers}/>
      </div>
    )
  }
}

export default App;
