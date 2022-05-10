const Post = require('../model/post.model')
const jwt = require('jsonwebtoken')

const addNewPost= async (req, res) => {
  const {body, params} = req
  let newPost = new Post(body);
  console.log(params)
  newPost.event_id = params.eventId
  const decodejwt = jwt.decode(req.cookies.userToken, {complete: true});
  newPost.user_id = decodejwt.payload.id;

  try {
    newPost = await newPost.save();
    res.json(newPost)
    return;

  } catch (error) {
    console.log("error", error)
    res.status(400).json(error)
    return;
  }

}

module.exports = {addNewPost}