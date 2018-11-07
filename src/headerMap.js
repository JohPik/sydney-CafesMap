import React from 'react'
import { Link } from 'react-router-dom'

function headerMap(props){
  return(
    <div className="heading">
      <Link to="/" className="home">
        <i className="fas fa-arrow-circle-left"></i>
      </Link>
      <h1 tabIndex="1" role="heading">Hello<i className="fas fa-coffee"></i>Cafés</h1>
    </div>
  )
}

export default headerMap
