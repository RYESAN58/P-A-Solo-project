const Event = require('../model/event.model')
const User = require('../model/user.model')
const jwt = require('jsonwebtoken')


const addNewEvent = async (req, res) => {
  console.log(req.file.originalname)
  let newEvent = new Event({
    title: req.body.title,
    description: req.body.description,
    image: req.file.originalname
  });
  console.log(newEvent);
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
  newEvent.user_id = decodedJwt.id
  console.log("new post added id", newEvent)
  try {
    newEvent = await newEvent.save();
    res.json(newEvent)
    return; 
  } catch (error) {
    console.log("error", error)
    res.status(400).json(error)
    return;
  };
};

const getAll = (request, response) => {
  Event.find({}).populate("user_id")
    .then( allEvents => {
      response.json(allEvents)
    })
    .catch((err)=> {
      console.log(err)
      response.json(err)
    })
  }


module.exports = {
  addNewEvent, 
  getAll
}