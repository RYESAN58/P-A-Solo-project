const Post = require('../model/post.model')
const jwt = require('jsonwebtoken')

const addNewPost= async (req, res) => {
  const {body, params, file} = req
  let newPost = new Post({
    image: file.originalname,
    caption: body.caption
  });
  console.log(params)
  newPost.event_id = params.eventId
  let decodedJwt;
  try {
    decodedJwt = await jwt.verify(
      req.cookies.userToken, 
      process.env.SECRET_KEY,
      );
      console.log("SUCCESS", decodedJwt)
  } catch (error) {
    console.log("TOKEN ERROR");
    res.status(400).json({errorMessage: "PLease Login"});
    return;
  }
  console.log("THIS IS THE OBJECT!!!!", decodedJwt)
  newPost.user_id = decodedJwt.id;

  try {
    newPost = await newPost.save();
    console.log(newPost)
    res.json(newPost)
    return;

  } catch (error) {
    console.log("error", error)
    res.status(400).json(error)
    return;
  }

}

const allPost =(request, response) => {
  Post.find({event_id: request.params.id}).populate('user_id')
  .then(allPost => response.json(allPost))
  .catch(err => response.status(400).json(err))
}

module.exports = {
  addNewPost,
  allPost
}