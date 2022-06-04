require("dotenv").config();

const S3 = require('aws-sdk')
const express = require('express')
const cors = require('cors')
const app = express()

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_key
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

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

const port = process.env.PORT || 8000

app.listen(port || 19434, () => {
  console.log(`Listening on port:`)
})