import React, { Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


class MyMap extends Component {
  state = {
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false
  };

  onMarkerClick = (props, marker) =>{
    console.log("marker", marker)
    console.log("props", props)
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true
    })}

  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });

  onMapClicked = () => {
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      });
  };

  render() {
    if (!this.props.loaded) return <div>Loading...</div>;

    return (

      <Map
        className="map"
        google={this.props.google}
        onClick={this.onMapClicked}
        style={{ height: '100%', position: 'relative', width: '100%' }}
        initialCenter={{lat: -27.470125, lng: 153.021072}}
        zoom={13}>


          {this.props.allMarkers.map(cinema =>
            <Marker
              key={cinema.id} name={cinema.name} position={cinema.location}
              address={cinema.address} city={cinema.city} postalCode={cinema.postalCode} state={cinema.state} country={cinema.country}
              onClick={this.onMarkerClick}/>
          )}

        <InfoWindow marker={this.state.activeMarker} onClose={this.onInfoWindowClose} visible={this.state.showingInfoWindow}>
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
            <p>{this.state.selectedPlace.address}, {this.state.selectedPlace.city}, {this.state.selectedPlace.postalCode}, {this.state.selectedPlace.state}, {this.state.selectedPlace.country}</p>
          </div>
        </InfoWindow>

      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyDS0pzpMW_qNo6xMb8d0I69zukaOsC0Lx0")
})(MyMap)
