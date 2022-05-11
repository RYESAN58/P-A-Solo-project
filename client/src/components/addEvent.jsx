import "../App.css"
import axios from "axios";
import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Link, useNavigate} from "react-router-dom"

const AddEvent = () => {
  const navigate= useNavigate()
	const [events, setEvents] = useState([])

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
  return (
    <div>
        <Form>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="text" placeholder="Email"/>
        </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" placeholder="Password"/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <br></br>
          <Link to="/register">Click To Register</Link>
        </Form>
        {events.map((event, index)=> {
          return(
            <div key={index}>
              <p>{event.title}</p>
              <p>{event.description}</p>
              <p>{event.user_id}</p>
              <hr></hr>
            </div>
          )
        })}
    </div>
  )
}


export default AddEvent