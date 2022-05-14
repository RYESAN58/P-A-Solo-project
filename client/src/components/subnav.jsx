import React from "react";
import {Link, useNavigate} from "react-router-dom"
import Button from 'react-bootstrap/Button'
import axios from "axios";
import {faImages, faPowerOff} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"


const SubNav = (props) => {
  const navigate = useNavigate()
  const handleLogout = () => {
    axios
      .post("http://localhost:8000/api/logout",{
      credentials: 'include'
    })
      .then((response) => {
        localStorage.removeItem('name')
        localStorage.removeItem('id')
        document.cookie = "userToken= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
        navigate('/')
      })
      .catch((error)=> {
        console.log(error)
      })
    }
  return(
    <div style={{ backgroundColor: '#495054', width:"100%", height: "50px", display: "flex", justifyContent: "space-between", padding: "7px"}}>
      <Button onClick={()=> navigate("/all")}>EVENTS <FontAwesomeIcon icon={faImages}></FontAwesomeIcon></Button>
      <Button onClick={handleLogout} variant="danger">Logout  <FontAwesomeIcon icon={faPowerOff}></FontAwesomeIcon></Button>
    </div>
  )
}

export default SubNav;