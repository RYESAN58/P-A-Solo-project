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
  const navigate = useNavigate()


  useEffect(() => {
		axios
			.get(`http://localhost:8000/api/allpost/${id}` || `https://photocred.herokuapp.com/api/allpost/${id}`)
			.then((response) => {
        const result = response.data
				console.log(result)
        setPost(result)
        setName(localStorage.getItem('name'))
        setId(localStorage.getItem('id'))
        if (localStorage.getItem('name') === null){
          navigate('/error')
        }
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
    axios.get(`http://localhost:8000/api/one/${id}` || `https://photocred.herokuapp.com/api/one/${id}`)
      .then(res => {
        console.log(res.data);
        setEvent(res.data);
      })
      .catch( err => console.log(err))
}, [dummy]);

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
    .post(`http://localhost:8000/api/poster/${id}` || `https://photocred.herokuapp.com/api/poster/${id}`, formData, {
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
    axios.delete(`http://localhost:8000/api/delete/post/${id}` || `https://photocred.herokuapp.com/api/delete/post/${id}`)
    .then(res => {
      console.log(res)
      setDummy(!dummy)
  })
    .catch(err => console.log(err))
}

  return(
    <div style={{textAlign:"center"}}>
      <Navy/>
      <SubNav id={`${id}`}/>
      <h2>{event.title}</h2>
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
                      src={`https://photocred.s3.amazonaws.com/${post.image}`}
                    >
                    </Figure.Image>
                    <p>{post.caption}</p>
                    <Figure.Caption >
                      Posted by {post.user_id.FirstName}
                    </Figure.Caption>
                    {
                    post.user_id._id === idFromUser ?
                    <Button variant="danger" style={{margin: "5px"}} onClick={(e) => {
                      let x = window.confirm('are you sure You Want to delete photo?')
                      if (x){
                        deletePost(post._id)
                        setDummy(!dummy)
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