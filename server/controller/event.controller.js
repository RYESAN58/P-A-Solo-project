const Event = require('../model/event.model')
const User = require('../model/user.model')
const jwt = require('jsonwebtoken')


const addNewEvent = async (req, res) => {
  const { body } = req;
  let newEvent = new Event(body);
  console.log(newEvent);
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
  Event.find({})
    .then( allEvents => {
      console.log(allEvents)
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