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
  initMap () {
    let sydney = {lat: -32.826687, lng: 146.632891}
    const map = new window.google.maps.Map(document.getElementById('map'), {zoom: 4, center: sydney})
    let marker = new window.google.maps.Marker({position: sydney, map: map});
  }

  render() {
    return(
      <div className="map-section">
        <h2>map Section</h2>
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
}


export default Map
