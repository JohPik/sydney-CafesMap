/* WANT TO DO*/

import React, { Component } from 'react'

class Map extends Component {

  /* manage async callback from googAPI*/
  componentDidMount(){
    this.renderMap()
  }

  /* render the map*/
  renderMap(){
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyCuGxStq3mHtzeuhtOS0wRxgg5mYeP04RM&callback=initMap')
    window.initMap = this.initMap
  }

  /*control elements on the map*/
  // initMap () {
  //   let sydney = {lat: -27.470125, lng: 153.021072}
  //   const map = new window.google.maps.Map(document.getElementById('map'), {zoom: 4, center: sydney})
  //   let marker = new window.google.maps.Marker({position: sydney, map: map})
  //   console.log("map is rendered")
  // }

  /* From GOOGLE MAP */

 map = ""
 markers = []
 hello = "hello Mother fucker"

initMap() {
  var haightAshbury = {lat: 37.769, lng: -122.446}

  this.map = new window.google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: haightAshbury,
    mapTypeId: 'terrain'
  })

  // This event listener will call addMarker() when the map is clicked.
  this.map.addListener('click', function(event) {
    this.addMarker(event.latLng)
  })

  console.log("mother Fucker", this.hello)
  console.log(this);

  // Adds a marker at the center of the map.
  //this.addMarker(haightAshbury)
}

// Adds a marker to the map and push to the array.
// addMarker = (location) => {
//   var marker = new window.google.maps.Marker({
//     position: location,
//     map: this.map //NOT SURE
//   })
//   this.markers.push(marker)
// }
addMarker(x){
  console.log("Hello:", x);
}

// Sets the map on all markers in the array.
setMapOnAll(map) {
  for (var i = 0; i < this.markers.length; i++) {
    this.markers[i].setMap(map)
  }
}

// Removes the markers from the map, but keeps them in the array.
clearMarkers() {
  this.setMapOnAll(null)
}

// Shows any markers currently in the array.
showMarkers() {
  this.setMapOnAll(this.map)
}

// Deletes all markers in the array by removing references to them.
deleteMarkers() {
  this.clearMarkers()
  this.markers = []
}

  render() {
    console.log(this.props)
    return(
      <div className="map-section">
        <h2>map Section</h2>

          <div id="floating-panel">
            <button onClick={this.clearMarkers}>Hide Markers</button>
            <button onClick={this.showMarkers}>Show All Markers</button>
            <button onClick={this.deleteMarkers}>Delete Markers</button>

          </div>
        <div id="map"></div>
      </div>
    )
  }
}

/* The following function insert the GoogleMap script Tag in the DOM*/
const loadScript = url => {
  let index = window.document.getElementsByTagName("script")[0]
  let script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
  console.log("map is called")
}


export default Map
