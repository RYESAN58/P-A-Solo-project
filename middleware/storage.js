const multer= require('multer')





const storage = multer.diskStorage({
  filename: (re1, file, cb) => {
    cb(null, file.originalname);
  }
})


const upload = multer({storage: storage});

module.exports = {
  upload
}