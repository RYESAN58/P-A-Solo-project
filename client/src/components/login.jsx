import "../App.css"
import axios from "axios";
import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Link, useNavigate} from "react-router-dom"
import Navy from "./nav";

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [sucessMsg, setSuccessMsg] = useState('')
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit= (e) => {
    e.preventDefault();
    setErr("")
    setSuccessMsg('')
    const postData = {email, password};
    axios
      .post("http://localhost:8000/api/login" || "https://photocred.herokuapp.com/api/login", postData, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response)
        const result = response.data
        console.log(result._id)
        localStorage.setItem(`name`, `${result.FirstName}`)
        localStorage.setItem(`id`, `${result._id}`)
        navigate('/getall')
      })
      .catch((err) => {
				console.log('ERROR!', err.response);
				setErrors(err.response.data.error)
        console.log(err.response.data.error)
				})

    };
  

    const handleEmail =(e) => {
      setEmail(e.target.value)
    }
    const handlePassword =(e) => {
      setPassword(e.target.value)
    }
  return(
    <div>
      <Navy/>
      <div className="register" style={{height: "500px"}}>
        <h2 className="display-4">Login Here</h2>
        {
          errors ?
          <p style={{color: "red"}}>{errors}</p>:
          ''
        }
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="text" placeholder="Email"  onChange={handleEmail}/>
          </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" placeholder="Password"  onChange={handlePassword}/>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <br></br>
            <Link to="/register">Click To Register</Link>
          </Form>
        </div>
      </div>
  )


  }

export default Login;