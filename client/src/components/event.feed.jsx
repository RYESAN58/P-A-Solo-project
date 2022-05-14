import "../App.css"
import axios from "axios";
import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Figure from 'react-bootstrap/Figure'
import {Link, useNavigate, useParams} from "react-router-dom"
import DetailedPost from "./detailed.post";
import Navy from "./nav";
import SubNav from "./subnav";


const EventFeed = () => {
  const [event, setEvent] = useState({})
  const {id} = useParams();
  const [image, setPic] = useState('')
  const [caption, setCaption] = useState('')
  const [allPost, setPost] = useState([])
  const [photoProp, setPhotoProp] = useState('')
  const [captionProp, setCaptionProp] = useState('')
  const [userProp, setUserProp] = useState('')
  const [dummy, setDummy] = useState('')
  const[name , setName] = useState('')
  const [idFromUser, setId] = useState('')


  useEffect(() => {
		axios
			.get(`http://localhost:8000/api/allpost/${id}`)
			.then((response) => {
        const result = response.data
				console.log(result)
        setPost(result)
        setName(localStorage.getItem('name'))
        setId(localStorage.getItem('id'))
			})
			.catch((err) => console.log(err.response));
    }, [dummy]);



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
}, [dummy]);

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
    .post(`http://localhost:8000/api/poster/${id}`, formData, {
    withCredentials: true,
  })
    .then((newEvent) => {
      console.log(newEvent)
      setDummy(!dummy)
    })
    .catch((err)=> {
      console.log(err.message);
      if(err.message) {
      }else {
        console.log(err)
      }
    })
  }

  const deletePost = (id) => {
    axios.delete(`http://localhost:8000/api/delete/post/${id}`)
    .then(res => {
      console.log(res)
      setDummy(!dummy)
  })
    .catch(err => console.log(err))
}

  return(
    <div style={{textAlign:"center"}}>
      <Navy/>
      <SubNav/>
      <h2>{event.title}</h2>
      <div className="EVE addEvent" style={{width: "400px"}}>
        <Form onSubmit={handleSubmit} encType="multipart/form=data">
            <Form.Group controlId="formFileSm" className="mb-3">
              <Form.Label>Upload your photos from {event.title}</Form.Label>
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
        <div  style={{display: "flex", justifyContent: "space-evenly", marginTop:'40px' }}>
          <div style={{ marginLeft:"10px"}}>
            <DetailedPost image = {`${photoProp}`} caption={`${captionProp}`} FirstName={`${userProp}`}/>
          </div>
          <div style={{display: "flex", flexDirection:"row-reverse", justifyContent:"space-evenly",flexWrap: "wrap"}}>
            {allPost.map((post, index)=> {
              return(
                <div style={{cursor: "pointer"}} onClick={() =>{
                  setCaptionProp(`${post.caption}`)
                  setUserProp(`${post.user_id.FirstName}`)
                  setPhotoProp(`${post.image}`)
                }
                } key={index}>
                  <Figure>
                    <Figure.Image
                      alt="171x180"
                      style={{
                        width:'150px',
                        height:'150px',
                        objectFit: "cover",
                        border: "5px solid black",
                        marginRight: "5px",
                      }}
                      src={require(`../../public/uploads/${post.image}`)}
                    >
                    </Figure.Image>
                    <p>{post.caption}</p>
                    <Figure.Caption >
                      Posted by {post.user_id.FirstName}
                    </Figure.Caption>
                    {
                    post.user_id._id === idFromUser ?
                    <Button variant="danger" style={{margin: "5px"}} onClick={(e) => {
                      let x = window.confirm('are you sure You Want to adopt?')
                      if (x){
                        deletePost(post._id)
                      }
                    }}>Delete</Button>:
                    ""
                  }
                  </Figure>
                </div>
              )
            })}
          </div>
        </div>
    </div>
  )
}

export default EventFeed;