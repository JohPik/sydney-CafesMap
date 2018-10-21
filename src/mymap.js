import React, { Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import escapeRegExp from 'escape-string-regexp'


class MyMap extends Component {
  state = {
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false,
    query: "" //query of the Search
  }


  /*** Manage Markers when clicked***/
  onMarkerClick = (props, marker) => {
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true
    })}

  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    })

  onMapClicked = () => {
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      })
  }

 // When Input Cahnges the query changes too
  updateQuery(query){
    this.setState({query: query.trim()})
  }

  render() {
    //Default Message While Loading
    if (!this.props.loaded) return <div>Loading...</div>

      //Filter through all the Markers to render only the ones that match the search
      let showMarker

      if(this.state.query){
        const match = new RegExp(escapeRegExp(this.state.query), 'i')
        showMarker = this.props.allMarkers.filter((marker) =>   match.test(marker.name))
      } else {
        showMarker = this.props.allMarkers
      }


    return (
      <div className="mainContent">

        {/* Renders the Input Field*/}
        <div className="search">
          <input
            className="search-cinemas"
            type="text"
            placeholder="Search for your favorite Café"
            value={this.state.query}
            onChange={(e) => this.updateQuery(e.target.value)}
              />

          <div className="search-result">
            { showMarker.length > 1 ?

              <ul className="search-list">
                {showMarker.map(cafe =>
                  <li key={cafe.id}>
                    <p className="cafe-name" onClick={this.onMarkerClick}>{cafe.name}</p>
                    <p className="cafe-address">{cafe.address}, {cafe.postalCode}, {cafe.state},<br/> {cafe.city}, {cafe.country}</p>
                </li>
                )}
              </ul>

              :

              <p>Ooops Nothing march your search</p>
            }


            </div>

        </div>

      {/* Renders the Map, the Markers, and the info Windows*/}
      <Map
        className="map"
        google={this.props.google}
        onClick={this.onMapClicked}
        style={{ height: '100%', position: 'static', width: '100%' }}
        initialCenter={{lat: -33.8688, lng: 151.2093}}
        zoom={16}
        >

        {/* Renders the Markers, by maping though showMarker*/}
        {showMarker.map(cafe =>
          <Marker
            key={cafe.id} name={cafe.name} position={cafe.location}
            address={cafe.address} city={cafe.city} postalCode={cafe.postalCode} state={cafe.state} country={cafe.country}
            onClick={this.onMarkerClick}/>
        )}

        {/* Renders the info Windows*/}
        <InfoWindow marker={this.state.activeMarker} onClose={this.onInfoWindowClose} visible={this.state.showingInfoWindow}>
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
            <p>{this.state.selectedPlace.address}, {this.state.selectedPlace.city}, {this.state.selectedPlace.postalCode}, {this.state.selectedPlace.state}, {this.state.selectedPlace.country}</p>
          </div>
        </InfoWindow>

      </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyDS0pzpMW_qNo6xMb8d0I69zukaOsC0Lx0")
})(MyMap)
