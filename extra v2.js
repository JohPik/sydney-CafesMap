/* WORKING CODE*/

import React, { Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


class MyMap extends Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  // onMarkerClick = (props, marker, e) =>
  //   this.setState({
  //     selectedPlace: props,
  //     activeMarker: marker,
  //     showingInfoWindow: true
  //   });

  onMarkerClick(){
      console.log("mofo");
  }



  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };


  render() {
    console.log(this.props);
    return(
      <div className="map-section">
        <h2>map Section</h2>
        <Map google={this.props.google}
        initialCenter={{lat: -27.470125, lng: 153.021072}}
        zoom={12}
        >

        {this.props.allMarkers.map(cinema =>
          <Marker key={cinema.id}  name={cinema.name}
            position={cinema.location}
            onClick={this.onMarkerClick}
          />
        )}

        <InfoWindow onClose={this.onInfoWindowClose} >
          <div>
              <h1>hello</h1>
              <h2>lol</h2>
            </div>
        </InfoWindow>

        {/*
        {this.props.allMarkers.map(cinema =>
          <InfoWindow onClose={this.onInfoWindowClose} key={cinema.index}>
            <div>
                <h1>{cinema.name}</h1>
                <h2>{cinema.location}</h2>
              </div>
          </InfoWindow>
        )}
        */}

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
