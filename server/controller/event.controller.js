const Event = require('../model/event.model')
const User = require('../model/user.model')
const jwt = require('jsonwebtoken')


const addNewEvent = async (req, res) => {
  const { body } = req;
  let newEvent = new Event(body);
  console.log(newEvent);
  const decodedJwt = jwt.decode(req.cookies.userToken, { complete: true })
  console.log('TOKEN', decodedJwt)
  console.log("id: ", decodedJwt.payload.id)
  res.json({msg:"Got here"});
}


module.exports = {
  addNewEvent
}