const jwt = require("jsonwebtoken")

const authenticate = async(req , res , next ) => {
  try {
    decodedJwt = await jwt.verify(
      req.cookies.userToken, 
      process.env.SECRET_KEY,
      );
      req.body.user_id = decodedJwt.id;
      console.log("SUCCESS", decodedJwt)
      next();
  } catch (error) {
    console.log("TOKEN ERROR");
    res.status(400).json({errorMessage: "PLease Login"});
  }
}


module.exports = {
  authenticate
}