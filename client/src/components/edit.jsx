import axios from "axios";
import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Navy from "./nav";
import { useNavigate, useParams } from "react-router-dom";
import Table from 'react-bootstrap/Table'
import SubNav from "./subnav";



const Edit = () => {
  const [oldImage, setImage] = useState('')
  const [image, setPic] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [post, setPost] = useState([])
  const {id} = useParams();
  const navigate = useNavigate()
  const formData = new FormData();
  
  formData.append('title', title)
  formData.append("description", description)
  formData.append('image', image)
  
  
  useEffect(()=> {
		axios.get(`http://localhost:8000/api/one/${id}` || `https://photocred.herokuapp.com/api/one/${id}`)
			.then(res => {
        console.log(res.data)
				setDescription(res.data.description)
        setTitle(res.data.title)
        setImage(res.data.image)
				console.log(res.data);
			})
			.catch( err => console.log(err))
	}, []);

  
  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(image)
    axios.put(`http://localhost:8000/api/edit/${id}` || `https://photocred.herokuapp.com/api/edit/${id}`, formData)
    .then(res => {
      console.log(res);
      navigate('/getall')
    })
		.catch(err => console.log(err))
  }
  
  const handleTitle = (e) => {
    setTitle(e.target.value)
  }
  
  const handleDescription = (e) => {
    setDescription(e.target.value)
  }
  
  const handleFile = (e) => {
    console.log(e.target.files[0])
    setPic(e.target.files[0])
    console.log(image)
  }


  useEffect(() => {
    axios
    .get(`http://localhost:8000/api/allpost/${id}` || `https://photocred.herokuapp.com/api/allpost/${id}`)
    .then((response) => {
        const result = response.data
				console.log(result)
        setPost(result)
        // setName(localStorage.getItem('name'))
        // setId(localStorage.getItem('id'))
			})
			.catch((err) => console.log(err.response));
    },[]);


  return(
    <div>
      <Navy/>
      <SubNav/>
      <div>
        <div className="addEvent">
        <h2 className="display-4">Edit Event</h2>
        <Form onSubmit={handleUpdate} encType="multipart/form-data">
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Title of event:</Form.Label>
            <Form.Control type="text" value={`${title}`} onChange={handleTitle}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description:</Form.Label>
            <Form.Control as="textarea" rows={2} value={`${description}`} onChange={handleDescription}/>
          </Form.Group>
          <Form.Group controlId="formFileSm" className="mb-3">
            <Form.Label>Upload Landing Photo</Form.Label>
            <Form.Control type="file" size="sm" filename ="image" onChange={(e) => {
              setPic(e.target.files[0])
              console.log(image)
            }} required={true}/>
          </Form.Group>
          <br></br>
          <Button variant="primary" type="submit">
          {/* style={{marginTop: "8px", display:`${display}`}} */}
            Submit
          </Button>
        </Form>
      </div>
      <div>
        <Table variant="default" style={{width:"90%", margin: "auto", marginTop: "30px"}}>
          <thead>
            <tr>
              <th>
                Image
              </th>
              <th>
                All Caption from Your Event
              </th>
              <th>
                Posted By
              </th>
              <th>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
          {
          post.map((post, index)=> {
            return(
            <tr key={index}>
              <td>
                <img src={`https://photocred.s3.amazonaws.com/${post.image}`} style={{height:"50px", width:"50px", borderRadius:"50%"}}/>
              </td>
              <td>
                {post.caption}
              </td>
              <td>
                {post.user_id.FirstName}
              </td>
              <td>
                <Button variant="danger" onClick={() => {
                      axios.delete(`http://localhost:8000/api/delete/post/${post._id}` || `https://photocred.herokuapp.com/api/delete/post/${post._id}`)
                      .then(res => {
                        console.log(res)
                    })
                      .catch(err => console.log(err))
                }}>Delete</Button>
              </td>
            </tr>
            )
          })
          }
          </tbody>
          </Table>
          </div>
        </div>
      </div>
    )
  }


export default Edit;