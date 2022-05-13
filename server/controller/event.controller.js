const Event = require('../model/event.model')
const User = require('../model/user.model')
const jwt = require('jsonwebtoken')


const addNewEvent = async (req, res) => {
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
const deleteEvent = (request, response) => {
		Event.deleteOne({_id: request.params.id})
			.then(deleteConfirmation => response.json(deleteConfirmation))
			.catch(err => response.json(err))
}

const updateEvent = (request, response) => {
  Event.findOneAndUpdate({_id: request.params.id}, request.body, {new: true})
    .then(updatedPet => response.json(updatedPet))
    .catch(err=> response.json(err))
}

const findOneEvent = (request, response )=> {
  Event.findOne({_id:request.params.id}).populate("user_id")
    .then(event => response.json(event))
    .catch(event => response.status(400).json(err))
}


module.exports = {
  addNewEvent, 
  getAll,
  deleteEvent,
  updateEvent,
  findOneEvent
}