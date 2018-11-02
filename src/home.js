import React, { Component } from 'react'


class Home extends Component {

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

export default Home;
