import "../App.css"
import React, { useEffect, useState } from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faHouse, faArrowCircleRight, faClipboard} from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import axios from "axios"


const Navy = () =>{
  const navigate = useNavigate()
  const [events, setEvents] = useState([])
  const [input, setInput] = useState('')

  const inputHandler = (e) => {
    let lowerCase = e.target.value.toLowerCase();
    console.log(lowerCase)
    setInput(e.target.value)
    console.log(input)
  }
  const filteredEvents = events.filter((el)=> {
    if(input === ''){
      return el
    }else{
      return el.title.toLowerCase().includes(input)
    }
  })


  useEffect(() => {
		axios
			.get('https://photocred.herokuapp.com/api/getAll')
			.then((response) => {
        const result = response.data
				console.log(response.data)
        setEvents(result)
        // setName(localStorage.getItem('name'))
        // setId(localStorage.getItem('id'))
			})
			.catch((err) => console.log(err.response));
    }, []);

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
        <div className="wrap" style={{display: 'flex', flexDirection:"column"}}>
        <div className="search">
          <input type="text" className="searchTerm form-control me-2" placeholder="What are you looking for?"  onChange={inputHandler} />
          <button type="submit" className="btn btn-outline-primary" onChange={inputHandler} disabled>
            SEARCH
          </button>
        </div>
        <div style={{backgroundColor:"white"}}>
            {filteredEvents.map((item, index) =>{ 
              return(
                input.length > 1 ?
                  <div className="pointer search" style={{marginLeft:'4px', border:"solid gray 1px"}} onClick= {()=> {
                    navigate(`/details/${item._id}`)
                  }}>
                    <p style={{color: 'black'}} key={index}>{item.title}</p>
                  </div>:
                  ''
                )
            })
            }
        </div>
      </div>
    </nav>
    )
  }

export default Navy;

