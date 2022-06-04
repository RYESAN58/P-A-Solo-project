const multer= require('multer')
const {uploadFile} = require("../s3")




const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "client/public/uploads");
  },
  filename: (re1, file, cb) => {
    cb(null, file.originalname);
  }
})


const upload = multer({storage: storage});

module.exports = {
  upload
}