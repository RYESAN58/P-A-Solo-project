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
			.get('https://photocred.herokuapp.com/api/getAll')
			.then((response) => {
        const result = response.data
				console.log(response.data)
        setEvents(result)
        setName(localStorage.getItem('name'))
        setId(localStorage.getItem('id'))
        if (localStorage.getItem('name') === null){
          navigate('/error')
        }
			})
			.catch((err) => console.log(err.response));
    }, [dummy]);

  const deleteEvent = (id) => {
    axios.delete(`https://photocred.herokuapp.com/api/delete/${id}`)
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
      <h2 style={{width:'20%', margin:'auto'}}>Welcome {name}</h2>
      {events.map((event, index)=> {
        return(
        <div style={{ display: "flex", flexDirection:"column", width:'35rem', margin: "auto", marginTop:"35px"}} key={index}>
          <div style={{backgroundColor: "black", width:'100%',height:"10px"}}></div>
          <div style={{display: "flex", flexDirection:'row'}}>
            <div style={{display: 'flex', width:"100%"}}>
              <img src={`https://photocred.s3.amazonaws.com/${event.image}`} alt="" style={{height:"75px", width:"75px", objectFit:"cover", margin:'auto'}}/>
              <div style={{ width:'100%', padding:"0px 8px"}}>
                <div style={{display: 'flex', justifyContent:'space-between', width:"100%", height:"50px"}}>
                  <h3>{event.title}</h3>
                  <h3><span style={{fontSize:"10px"}}>Posted By </span>{event.user_id.FirstName}</h3>
                </div>
                <div style={{marginTop: "13px"}}>
                  <p>{event.description}</p>
                </div>
                <div style={{diplay:"flex", justifyContent: "space-evenly"}}>
                  <Button onClick={()=> {
                    navigate(`/details/${event._id}`)
                  }}>Event Album</Button>
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
                    <Button variant="danger" style={{margin: "5px"}} onClick= {(e) => {
                      console.log("YOOOOO")
                      let x = window.confirm('Are you sure you want to delete?')
                      if (x){
                        deleteEvent(event._id)
                      }
                    }}>Delete</Button>:
                    ""
                  }
                </div>
                <div style={{display: "flex", justifyContent:"space-around", borderTop:"gray 2px solid"}}>
                  {
                    event.city ?
                    <span onClick={()=>{navigate(`/map/${event.streetNumber}/${event.streetName.trim()}/${event.streetType}/${event.city}/${event.state}`)}} className="pointer">
                      <p><FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon> {event.city}</p>
                    </span>:
                    <p><FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon> location </p>
                  }
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