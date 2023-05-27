import React from 'react'
import Search from './Search'
import Taglist from './Taglist'
import ResultsSearch from './ResultsSearch'
import {Link} from "react-router-dom"


function Homebar() {
  
  return (
    <div className="homeBar">
      <div className="cont">
        <div className="logo">
          <Link to={"/"}>Rule34</Link>
        </div>
        <span>
          <ResultsSearch/>
        </span>
      </div>

      <div className="tagcont">
        <Taglist/>  
      </div>
    </div>
  )
}

export default Homebar