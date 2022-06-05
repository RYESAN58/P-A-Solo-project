import "../App.css"
import axios from "axios";
import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Figure from 'react-bootstrap/Figure'
import {Link, useNavigate} from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Navy from "./nav";
import SubNav from "./subnav";

const AddEvent = () => {
  const navigate= useNavigate()
  const [image, setPic] = useState('')
	const [events, setEvents] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [authError, setAuthError] = useState('')
  const [errors, setErrors] = useState({})
  const [display, setDisplay] = useState('none')
  const[name , setName] = useState('')
  const [idFromUser, setId] = useState('')
  const [dummy, setDummy] = useState(false)
  const [addAddy, setAddy] = useState(false)
  const [streetNumber, setStreetNumber] = useState('')
  const [streetName, setStreetName] = useState('')
  const [streetType, setStreetType] = useState('')
  const [city, setCity] = useState('')
  // LOl this is ironic That's how they teach you usestate
  const [state, setState] = useState('')



	useEffect(() => {
		axios
			.get( "http://localhost:8000/api/getAll" || 'https://photocred.herokuapp.com/api/getAll')
			.then((response) => {
        const result = response.data
				console.log(response.data)
        setEvents(result)
        setName(localStorage.getItem('name'))
        setId(localStorage.getItem('id'))
        console.log(localStorage.getItem('name'))
        if (localStorage.getItem('name') === null){
          navigate('/error')
        }
        
			})
			.catch((err) => console.log(err.response));
    }, [dummy]);

  const formData = new FormData();

  formData.append('title', title)
  formData.append("description", description)
  formData.append('image', image)
  formData.append('streetNumber', streetNumber)
  formData.append('streetName', streetName)
  formData.append('streetType', streetType)
  formData.append('city', city)
  formData.append('state', state)


  const handleTitle = (e) => {
    setTitle(e.target.value)
    if(title.length > 0 && description.length > 1){
      setDisplay("")
    }else{
      setDisplay('none')
    }
  }
  const handleDescription = (e) => {
    setDescription(e.target.value)
    if(title.length > 0 && description.length > 1){
      setDisplay("")
    }else{
      setDisplay('none')
    }
  }

  const handleFile = (e)=> {
    setPic(e.target.files[0])
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    axios
    .post("http://localhost:8000/api/post" || 'https://photocred.herokuapp.com/api/post', formData, {
    withCredentials: true,
  })
  .then((newEvent) => {
    setErrors({})
    setAuthError("")
    console.log(newEvent)
    navigate('/getall')
  })
  .catch((err)=> {
    console.log(err.message);
    if(err.message) {
      setErrors('Must fill out entire form')
    }else {
      console.log(err)
    }
  })
  }
    const deleteEvent = (id) => {
      axios.delete( `http://localhost:8000/api/delete/${id}` || `https://photocred.herokuapp.com/api/delete/${id}`)
      .then(res => {
        console.log(res)
        setDummy(!dummy)
    })
      .catch(err => console.log(err))
  }
  const handleChecked = (e) =>{
    setAddy(e.target.checked)
  }

  const handleStreetNum = (e) => {
    setStreetNumber(e.target.value)
  }

  const handleStreetName = (e) => {
    setStreetName(e.target.value)
  }

  const handleStreetType = (e) => {
    setStreetType(e.target.value)
  }
  const handleCity = (e) => {
    setCity(e.target.value)
  }
  const handleState = (e) => {
    setState(e.target.value)
  }

  return (
    <div>
      <Navy/>
      <SubNav/>
      <div style={{display: "flex", justifyContent: "space-between", margin: "5px"}}>
        <h2>Hey {name} add an event to to feed</h2>
      </div>
      <Form onSubmit={handleSubmit} encType="multipart/form=data">
        <div style={{display:"flex"}}>
          <div className="addEvent" >
            <h2 className="display-4">Add Event</h2>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Title of event:</Form.Label>
                <Form.Control type="text" placeholder="Event Title" onChange={handleTitle}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Description:</Form.Label>
                <Form.Control as="textarea" rows={2} placeholder="Description of event" onChange={handleDescription}/>
              </Form.Group>
              <Form.Group controlId="formFileSm" className="mb-3">
                <Form.Label>Upload Landing Photo</Form.Label>
                <Form.Control type="file" size="sm" filename ="image" onChange={handleFile} required={true}/>
              </Form.Group>
              <br></br>
              <Form.Label>Add Location to Event</Form.Label>
              <Form.Check onChange={handleChecked}></Form.Check>
              <Button variant="primary" type="submit" style={{marginTop: "8px", display:`${display}`}}>
                Submit
              </Button>
          </div>
          {
            addAddy === true ?
            <div className="addEvent" style={{height: "640px"}} >
            <h2 className="display-4">Add Address</h2>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Street Number</Form.Label>
                <Form.Control type="text" placeholder="Street number including direction" onChange={handleStreetNum}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Street name</Form.Label>
                <Form.Control type="text" rows={2} placeholder="Street Name" onChange={handleStreetName}/>
              </Form.Group>
              <Form.Group controlId="formFileSm" className="mb-3">
                <Form.Label>Street Type</Form.Label>
                <Form.Control type="text" placeholder="...Street, Avenue, Parkway, Lane" onChange={handleStreetType} required={true}/>
              </Form.Group>
              <Form.Group controlId="formFileSm" className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="City" onChange={handleCity} required={true}/>
              </Form.Group>
              <Form.Group controlId="formFileSm" className="mb-3">
                <Form.Label>State Code</Form.Label>
                <Form.Control type="text" placeholder="State Code" onChange={handleState} required={true}/>
              </Form.Group>
              </div>:
              ""
          }
        </div>
      </Form>
    </div>
  )}


export default AddEvent