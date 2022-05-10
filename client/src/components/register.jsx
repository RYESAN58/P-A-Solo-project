import "../App.css"
import React, { useEffect, useState } from "react"
import axios from "axios"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useNavigate } from "react-router-dom"

const Register = (props) => {
  const [FirstName, setFirsname] = useState('')
  const [LastName, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const[ confirmPassword, setConfirm]= useState('')
  const navigate = useNavigate()
  
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }
  const handleName = (e) => {
    setFirsname(e.target.value)
  }
  const handleLname = (e) => {
    setLastname(e.target.value)
  }
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  const handlePassword2 = (e) => {
    setConfirm(e.target.value)
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/register", {
      FirstName,
      LastName,
      email,
      password,
      confirmPassword
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log("ERROR===", err.response);
      })
  }
  return(
    <div className="register">
      <h2 className="singup display-4">Register</h2>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Firstname:</Form.Label>
          <Form.Control type="text" placeholder="Firstname" onChange={handleName}/>
          {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Lastname:</Form.Label>
          <Form.Control type="text" placeholder="Lastname"  onChange={handleLname}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="Email" placeholder="Email"  onChange={handleEmail}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={handlePassword}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Verify Password:</Form.Label>
          <Form.Control type="password" placeholder="Password"  onChange={handlePassword2}/>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}


export default Register;

