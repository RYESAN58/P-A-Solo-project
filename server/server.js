require("dotenv").config();

const express = require('express')
const cors = require('cors')
const app = express()

// console.log(process.env.SECRET_KEY, process.env.CLIENT_URL, process.env.PORT)

const cookieParser = require('cookie-parser');
app.use(cookieParser())

app.use(cors({credentials: true, origin: process.env.CLIENT_URL}));
app.use(express.json())
app.use(express.urlencoded({extended: true}))

require('./config/mongoose.config')

const userRoutes = require('./routes/user.routes')
const eventRoutes = require('./routes/event.routes')
const postRoutes = require('./routes/post.routes')
userRoutes(app)
eventRoutes(app)
postRoutes(app)

// const jwt = require('jsonwebtoken')
// var token = jwt.sign({id: "dadsddsfd" }, process.env.SECRET_KEY)
// console.log("token:", token)

// const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
// console.log(decodedToken)

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`Listening on port:`)
})