import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faHouse, faArrowCircleRight, faClipboard} from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"


const Navy = () =>{
  const navigate = useNavigate()
  return(
    <nav className='Nav navbar'>
      <div>
        <span className='Color'>
          PhotoCred
        </span>
      </div>
      <div className='Navy'>
        <div className='inner pointer' onClick={()=> navigate("/")}>
          <FontAwesomeIcon icon={faHouse}></FontAwesomeIcon>
          <span className='headcon' >Home</span>
        </div>
        <div className='inner pointer' onClick={()=> { navigate("/register")}} >
        <FontAwesomeIcon icon={faClipboard}></FontAwesomeIcon>
        <span className='headcon'>Register</span>
        </div>
        <div className='inner pointer' onClick={()=> navigate("/")} >
          <FontAwesomeIcon icon={faArrowCircleRight}></FontAwesomeIcon>
          <span className="headcon">Login</span>
        </div>
      </div>
        <div className="wrap">
        <div className="search">
          <input type="text" className="searchTerm form-control me-2" placeholder="What are you looking for?" />
          <button type="submit" className="btn btn-outline-primary">
            SEARCH
          </button>
        </div>
      </div>
    </nav>
    )
  }

export default Navy;

