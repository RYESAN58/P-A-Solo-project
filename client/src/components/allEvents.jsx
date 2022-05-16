import "../App.css"
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navy from "./nav";
import SubNav from "./subnav";
import Button from 'react-bootstrap/Button'
import {faLocationDot} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

const All = () => {
  const [dummy, setDummy] = useState('');
  const [events, setEvents] = useState([])
  const navigate = useNavigate()
  const[name , setName] = useState('')
  const [idFromUser, setId] = useState('')

  useEffect(() => {
		axios
			.get('http://localhost:8000/api/getAll')
			.then((response) => {
        const result = response.data
				console.log(response.data)
        setEvents(result)
        setName(localStorage.getItem('name'))
        setId(localStorage.getItem('id'))
			})
			.catch((err) => console.log(err.response));
    }, [dummy]);

  const deleteEvent = (id) => {
    axios.delete(`http://localhost:8000/api/delete/${id}`)
    .then(res => {
      console.log(res)
      setDummy(!dummy)
  })
    .catch(err => console.log(err))
  }
  return(
    <div>
      <Navy></Navy>
      <SubNav></SubNav>
      {events.map((event, index)=> {
        return(
        <div style={{ display: "flex", flexDirection:"column", width:'35rem', margin: "auto", marginTop:"35px"}}>
          <div style={{backgroundColor: "black", width:'100%',height:"10px"}}></div>
          <div style={{display: "flex", flexDirection:'row'}}>
            <div style={{display: 'flex', width:"100%"}}>
              <img src={require(`../../public/uploads/${event.image}`)} alt="" style={{height:"75px", width:"75px", objectFit:"cover", margin:'auto'}}/>
              <div style={{ width:'100%', padding:"0px 8px"}}>
                <div style={{display: 'flex', justifyContent:'space-between', width:"100%", height:"50px"}}>
                  <h3>{event.title}</h3>
                  <h3><span style={{fontSize:"10px"}}>Posted By </span>{event.user_id.FirstName}</h3>
                </div>
                <div>
                  <p>{event.description}</p>
                </div>
                <div style={{diplay:"flex", justifyContent: "space-evenly"}}>
                  <Button>Event Album</Button>
                  {
                    event.user_id._id === idFromUser ?
                    <Button variant="default" onClick={()=> {
                      navigate(`/edit/${event._id}`)
                    }}>
                      Edit
                    </Button>:
                    ''
                  }
                  {
                    event.user_id._id === idFromUser ?
                    <Button variant="danger" style={{margin: "5px"}} onClick={(e) => {
                      let x = window.confirm('are you sure You Want to adopt?')
                      if (x){
                        deleteEvent(event._id)
                      }
                    }}>Delete</Button>:
                    ""
                  }
                </div>
                <div style={{display: "flex", justifyContent:"space-around"}}>
                  <p><FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon> Location</p>
                  <p>Created : {event.createdAt.slice(0,-14)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        )})}
    </div>
  )  
}


export default All;