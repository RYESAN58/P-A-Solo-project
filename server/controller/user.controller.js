const User = require("../model/user.model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  // vaildating user 
  const { body } = req;
  try {
    const queriedUser = await User.findOne({email: body.email})
    if (queriedUser) {
      res.status(400).json({ error: "Email already in use!"})
      return;
    }
  } catch (error) {
    res.status(400).json(err);
  }
  const newUser = new User(body);
// adding user 
  try {
    const newUserObj = await newUser.save();
    res.json(newUserObj)
    return;
  } catch (error) {
    console.log("error in the mongoose save block")
    res.status(400).json(error)
    console.log(error)
    return;
  }
  const result = await User.create(body)
  console.log("result", result)
  res.json({msg: "You Got Here"})
  return;
};
const login = async (req, res) => {
  const { body } = req; 
  if(!body.email) {
    res.status(400).json({ error : "no email provided"})
    return;
  }
  let useQuery; 
  try {
    useQuery = await User.findOne({email: body.email})
  } catch (error){
    res.status(400).json({error: "email not found"})
    return;
  }
  console.log("query: ", useQuery)
  if (useQuery === null) {
    res.status(400).json({err: "email not found"})
    return;
  }
  const passwordCheck = bcrypt.compareSync( body.password, useQuery.password);
  if (!passwordCheck) {
    res.status(400).json({err:"email and/or password do not match"});
    return;
  }
  const userToken = jwt.sign({id: useQuery._id}, process.env.SECRET_KEY)
  console.log("token : " , userToken)
  res
    .cookie("userToken", userToken, process.env.SECRET_KEY, {
      httpOnly: true,
      expires: new Date(Date.now() + 900000000)
  })
  .json({msg: "succesful login" })
}
module.exports ={
  register,
  login
}