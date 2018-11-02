import React, { Component } from 'react'


class Home extends Component {
  state = {
    query: "" //query of the Search
  }

  // When Input Changes the query changes too
   updateQuery(query){
     this.setState({query: query.trim()})
   }


  render(){
    return (
      <div>
      <p>Where are you?</p>
      <input
        type="text" aria-label="Enter your location"
        aria-label="Your location" role="heading" tabindex="0"
        className="search-café"
        type="text"
        placeholder="Enter your location"
        value={this.state.query}
        onChange={(e) => this.updateQuery(e.target.value)}
          />
      </div>

    )
  }
}

export default Home;
