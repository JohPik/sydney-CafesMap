import React, { Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


class MyMap extends Component {

  render() {
    console.log(this.props);
    return(
      <div className="map-section">
        <h2>map Section</h2>
        <Map google={this.props.google}
        initialCenter={{lat: -27.470125, lng: 153.021072}}
        zoom={10}
        >
        {/*<Marker onClick={this.onMarkerClick}
                name={'Current location'} />*/}
        {this.props.allMarkers.map(cinema => <Marker key={cinema.id} name={cinema.name} position={cinema.location}/>)}


        {/*
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />

        <InfoWindow onClose={this.onInfoWindowClose}>
          <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>*/}

      </Map>
      </div>
    )
  }

}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyDS0pzpMW_qNo6xMb8d0I69zukaOsC0Lx0")
})(MyMap)
