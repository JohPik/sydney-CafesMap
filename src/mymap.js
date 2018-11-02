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

  markerObjects = [] //Array of Marker Objects

 //Populate the array of markers
    onMarkerMounted = (element) => {
      //Markers are added to markerObjects until its length == 100
      if (this.markerObjects.length !== this.props.allCafes.length) {
        this.markerObjects.push(element.marker)
      }
    }

  /*** Manage Markers when clicked***/
  onMarkerClick = (props, marker) => {

    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true
    })
  }

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

 // When Input Changes the query changes too
  updateQuery(query){
    this.setState({query: query.trim()})
  }

// Open InfoWindow when a link is cliked form the list
  openInfoWindow(link){
    this.markerObjects.map( marker => {
      if (marker.id === link) {
        window.google.maps.event.trigger(marker, 'click');
      }
    })
  }

  render() {
    console.log(this.props);
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
            type="text" aria-label="Search your Café"
            aria-label="Cafes Filtering" role="heading" tabindex="0"
            className="search-cafes"
            type="text"
            placeholder="Search your Café"
            value={this.state.query}
            onChange={(e) => this.updateQuery(e.target.value)}
              />
            <i className="fas fa-search" aria-hidden="true"></i>
            <p role="status" aria-label="number of search result" tabindex="0" className="cafes-numbers">We found <span>{showMarker.length}</span> cafés</p>


            { showMarker.length > 0 ?
            <div className="search-result">
                <ul className="search-list" role="list" aria-label="Filtered Café List" tabindex="0">
                  {showMarker.map(cafe =>
                    <li role="treeitem" aria-label={cafe.name} key={cafe.id}>
                      <a role="link" aria-label={cafe.name} tabindex="0" className="cafe-name" onClick={() =>  this.openInfoWindow(cafe.id)}>{cafe.name}</a>
                      <p className="cafe-address" role="document" aria-label="Restaurant Address" tabindex="0">
                        {cafe.address}, {cafe.postalCode}, {cafe.state},<br/> {cafe.city}, {cafe.country}
                      </p>
                  </li>
                  )}
                </ul>
              </div>
              :

              this.props.allCafes.length > 1 ?
                <div className="search-failed">
                  <p className="no-match">Ooops, nothing matches your search, please look for another venue</p>
                </div>
                  :
                <div className="search-loads">
                  <p className="loading-cafes">Page is Loading Please Wait</p>
                </div>

            }



        </div>

      {/* Renders the Map, the Markers, and the info Windows*/}
      <Map aria-label="Cafes Map" role="application" tabindex="1"
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
            aria-label="Cafes location" role="information" tabindex="1"
            ref={this.onMarkerMounted}
            animation={this.props.google.maps.Animation.DROP}
            key={cafe.id} id={cafe.id} name={cafe.name} position={cafe.location}
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
