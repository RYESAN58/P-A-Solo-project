const multer= require('multer')





const storage = multer.diskStorage({
  filename: (re1, file, cb) => {
    cb(null, file.originalname);
    console.log("AT MIDDLERWARE!!!")
  }
})


const upload = multer({storage: storage});

module.exports = {
  upload
}