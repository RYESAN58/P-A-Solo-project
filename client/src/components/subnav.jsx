import React from "react";
import {Link, useNavigate} from "react-router-dom"
import Button from 'react-bootstrap/Button'
import axios from "axios";
import {faImages, faPowerOff, faPlus} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"



const SubNav = (props) => {
  const navigate = useNavigate()
  const handleLogout = () => {
    axios
      .post("http://localhost:8000/api/logout" || "https://photocred.herokuapp.com/api/logout",{
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
      <div style={{display:"flex", width:"50%", justifyContent:'left'}}>
        <Button onClick={()=> navigate("/getall")} variant="dark" style={{marginRight:'10px'}}>EVENTS <FontAwesomeIcon icon={faImages}></FontAwesomeIcon></Button>
        <Button onClick={()=> navigate("/all")} variant="success" style={{marginRight:'10px'}}>Add Event <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></Button>
        {
          props.id ?
          <Button onClick={()=> navigate(`/addpost/${props.id}`)} style={{marginRight:'10px'}} variant="success">Add Photo <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></Button>:
          ''
        }
      </div>
      <Button onClick={handleLogout} variant="danger">Logout  <FontAwesomeIcon icon={faPowerOff}></FontAwesomeIcon></Button>
    </div>
  )
}

export default SubNav;