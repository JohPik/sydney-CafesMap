import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'


class Search extends Component {
  state = {
    query: ""
  }

  updateQuery(query){
    this.setState({query: query.trim()})
  }

  render() {
    let showMarker
    if(this.state.query){
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      showMarker = this.props.allMarkers.filter((marker) =>   match.test(marker.name))
      console.log("filetered result", showMarker);
    } else {
      showMarker = this.props.markers
    }
    console.log("searh Props", this.props);
    return (
      <div className="search-container">
        <input
          className="search-contacts"
          type="text"
          placeholder="Search your Cafés"
          value={this.state.query}
          onChange={(e) => this.updateQuery(e.target.value)}
            />
      </div>
    )
  }
}

export default Search
