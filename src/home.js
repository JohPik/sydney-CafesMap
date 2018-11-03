import React, { Component } from 'react'


class Home extends Component {


  componentDidMount(){
    this.renderSearch()
  }

  // render Autocomplete Search
  renderSearch = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDS0pzpMW_qNo6xMb8d0I69zukaOsC0Lx0&libraries=places&callback=activatePlaceSearch")
    window.activatePlaceSearch = this.activatePlaceSearch
  }

  // Use Autocomplete to generate nex map center
  activatePlaceSearch = () => {
    let input = document.querySelector(".search-café")
    let autocomplete = new window.google.maps.places.Autocomplete(input)
    autocomplete.addListener('place_changed', () => {
          var place = autocomplete.getPlace()

          let lat = place.geometry.location.lat()
          let lng = place.geometry.location.lng()

          this.props.mapCenterUpdate(lat, lng)

        })
  }


  render(){
     console.log("props", this.props);
    return (
      <div>
      <p>Where are you?</p>
      <input
        type="text" aria-label="Enter your location" role="heading" tabIndex="0"
        className="search-café"
        placeholder="Enter your location"
        value={ this.props.query}
        onChange={(e) => this.props.updateQuery(e.target.value)}
          />
      </div>

    )
  }
}

function loadScript (url){
  let index = window.document.getElementsByTagName("script")[0]
  let script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default Home;
