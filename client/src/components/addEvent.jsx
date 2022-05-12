import "../App.css"
import axios from "axios";
import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Figure from 'react-bootstrap/Figure'
import {Link, useNavigate} from "react-router-dom"


const AddEvent = () => {
  const navigate= useNavigate()
  const [image, setPic] = useState('')
	const [events, setEvents] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [authError, setAuthError] = useState('')
  const [errors, setErrors] = useState({})
  const [display, setDisplay] = useState('none')

	useEffect(() => {
		axios
			.get('http://localhost:8000/api/getAll')
			.then((response) => {
        const result = response.data
				console.log(response.data)
        setEvents(result)
			})
			.catch((err) => console.log(err.response));
    }, []);

    const formData = new FormData();

    formData.append('title', title)
    formData.append("description", description)
    formData.append('image', image)

    const handleTitle = (e) => {
      setTitle(e.target.value)
      if(title.length > 0 && description.length > 0){
        setDisplay("")
      }else{
        setDisplay('none')
      }
    }
    const handleDescription = (e) => {
      setDescription(e.target.value)
      if(title.length > 0 && description.length > 0){
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
      .post("http://localhost:8000/api/post", formData, {
      withCredentials: true,
    })
    .then((newEvent) => {
      setErrors({})
      setAuthError("")
      console.log(newEvent)
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

  return (
    <div>
      <div className="EVE">
        {events.map((event, index) => {
          return(
            <Figure style={{textAlign: "center"}} key={index}>
              <h3>{event.title}</h3>
              <Figure.Image
                width={171}
                height={180}
                alt={`event number ${index}`}
                src={`./uploads/${event.image}`}
                style={{height:"171px", width:"180px", borderRadius:"50%" }}
                />
              <Figure.Caption>
                {event.description}
              </Figure.Caption>
            </Figure>
          )
        })}
      </div>
      <div className="addEvent">
        <h2 className="display-4">Add Event</h2>
        <Form onSubmit={handleSubmit} encType="multipart/form=data">
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
          <Button variant="primary" type="submit" style={{marginTop: "8px", display:`${display}`}}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  )}


export default AddEvent