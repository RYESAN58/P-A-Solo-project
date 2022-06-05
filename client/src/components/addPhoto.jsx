import "../App.css"
import axios from "axios";
import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Link, Navigate, useNavigate, useParams } from "react-router-dom"
import Navy from "./nav";
import SubNav from "./subnav";


const AddPhoto = () => {
  const {id} = useParams();
  const [image, setPic] = useState('')
  const [caption, setCaption] = useState('')
  const [dummy, setDummy] = useState(false)
  const navigate = useNavigate()
  const formData = new FormData();

  formData.append('caption', caption)
  formData.append("image", image)



  const handleFile = (e)=> {
    setPic(e.target.files[0])
    console.log(image)
  }

  const handleCaption = (e) =>{
    setCaption(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
    .post(`http://localhost:8000/api/poster/${id}` || `https://photocred.herokuapp.com/api/poster/${id}`, formData, {
    withCredentials: true,
  })
    .then((newEvent) => {
      console.log(newEvent)
      navigate(`/details/${id}`)
    })
    .catch((err)=> {
      console.log(err.message);
      if(err.message) {
      }else {
        console.log(err)
      }
    })

  }
  return(
    <div>
      <Navy/>
      <SubNav/>
      <div className="EVE addEvent" style={{width: "400px"}}>
        <Form onSubmit={handleSubmit} encType="multipart/form=data">
            <Form.Group controlId="formFileSm" className="mb-3">
              <Form.Label>Upload your photos</Form.Label>
              <Form.Control type="file" size="sm" filename ="image" required={true} onChange={handleFile}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Caption</Form.Label>
              <Form.Control type="text" placeholder="Photo Caption" onChange={handleCaption} />
            </Form.Group>
            <br></br>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
    </div>
  )

}


export default AddPhoto;