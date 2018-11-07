import React, { Component } from 'react'
import './App.css'
import MyMap from './mymap'
import Home from './home'
import HeaderMap from './headerMap'
import { Route } from 'react-router-dom'


class App extends Component {

  state = {
    query: "",
    allCafes: [], //Store the Raw Data coming from fourSquare
    allMarkers: [], //Store the Markers Data
    mapCenter: {
      lat: "",
      lng: ""
    }
  }

  //Update mapCenter
  mapCenterUpdate = (ltd, lgt) => {
    let updatedMapCenter = {
      lat: ltd,
      lng: lgt
    }
    this.setState({
      mapCenter: updatedMapCenter
    })
    console.log("the map center", this.state.mapCenter);
  }

  logSomething(){
    console.log("it wors");
  }
  // When Input in Home Page Changes the query changes too
   updateQuery = (query) => {
     this.setState({query: query.trim()})
   }

  // Call fourSquare API to get the raw data about my cafes
  componentDidMount(){
      this.fourSquare()
  }

  fourSquare (){
    fetch('https://api.foursquare.com/v2/venues/explore?client_id=FBFR4MRSN5YJ34CQKWAN0RWG55X41LX0ILOLM5JW52T0ZMKP&client_secret=2NPKFK05BW3WOBENMIWPRPFKQEDBWLNGXX1ANW5YUFQ1QHLD&v=20180323&limit=100&near=sydney&radius=1500&query=Café')
      .then(places=> places.json())
      .then(parsedJSON => {
        //Get allCafes
        this.setState({ allCafes: parsedJSON.response.groups[0].items })
        //Get allMarkers
        this.createMarkers(this.state.allCafes)
      })
      .catch(error => console.log("oops"))
  }

  //Create Markers
  createMarkers(cafes){
    let allMarkers = []
      cafes.map( cafe => {
        let marker = {
          id: '',
          name: '',
          address: '',
          city:'',
          postalCode: '',
          state: '',
          country: '',
          location: {
            lat: 0,
            lng: 0
          }
        }
      marker.id = cafe.venue.id
      marker.name = cafe.venue.name
      marker.address = cafe.venue.location.address
      marker.city = cafe.venue.location.city
      marker.postalCode = cafe.venue.location.postalCode
      marker.state = cafe.venue.location.state
      marker.country = cafe.venue.location.country
      marker.location.lat = cafe.venue.location.lat
      marker.location.lng = cafe.venue.location.lng
      return allMarkers.push(marker)
    })
    this.setState({ allMarkers })
  }



  render() {
    return (
      <div className="main">
        <Route exact path="/"  render={() => (
            <Home query={this.state.query} updateQuery={this.updateQuery} mapCenterUpdate={this.mapCenterUpdate} logSomething={this.logSomething}/>
            )}
          />

      <Route exact path="/map" render={() => (
          <div className="map-screen">
            <HeaderMap/>
            <MyMap aria-label="Sydney Cafes App Main Content" role="application" allCafes={this.state.allCafes} allMarkers={this.state.allMarkers}/>
          </div>
          )}
        />
      </div>
    )
  }
}

export default App;
