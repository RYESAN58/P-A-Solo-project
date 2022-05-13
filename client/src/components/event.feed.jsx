import "../App.css"
import axios from "axios";
import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Figure from 'react-bootstrap/Figure'
import {Link, useNavigate, useParams} from "react-router-dom"



const EventFeed = () => {
  const [event, setEvent] = useState({})
  const {id} = useParams();
  const [image, setPic] = useState('')
  const [caption, setCaption] = useState('')
  const [allPost, setPost] = useState([])


  useEffect(() => {
		axios
			.get(`http://localhost:8000/api/allpost/${id}`)
			.then((response) => {
        const result = response.data
				console.log(result)
        setPost(result)
			})
			.catch((err) => console.log(err.response));
    }, []);



  const formData = new FormData();

  formData.append('caption', caption)
  formData.append("image", image)
  
  const handleFile = (e)=> {
    setPic(e.target.files[0])
  }

  const handleCaption = (e) =>{
    setCaption(e.target.value)
  }



  useEffect(()=> {
    axios.get(`http://localhost:8000/api/one/${id}`)
      .then(res => {
        console.log(res.data);
        setEvent(res.data);
      })
      .catch( err => console.log(err))
}, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
    .post(`http://localhost:8000/api/poster/${id}`, formData, {
    withCredentials: true,
  })
    .then((newEvent) => {
      console.log(newEvent)
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
    <div style={{textAlign:"center"}}>
      <h2>{event.title}</h2>
      {id}
      <div className="EVE addEvent" style={{width: "400px"}}>
        <Form onSubmit={handleSubmit} encType="multipart/form=data">
            <Form.Group controlId="formFileSm" className="mb-3">
              <Form.Label>Upload your photos from {event.title}</Form.Label>
              <Form.Control type="file" size="sm" filename ="image" required={true} onChange={handleFile}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Caption</Form.Label>
              <Form.Control type="text" placeholder="Event Title" onChange={handleCaption} />
            </Form.Group>
            <br></br>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
        {allPost.map((post, index)=> {
          return(
            <Figure key={index}>
              <Figure.Image
                alt="171x180"
                src={`./uploads/${post.image}`}
              >
              </Figure.Image>
              <Figure.Caption>
                {post.caption}
              </Figure.Caption>
            </Figure>
          )
        })}
    </div>
  )
}

export default EventFeed;