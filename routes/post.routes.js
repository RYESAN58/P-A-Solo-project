const PostCtrl = require("../controller/post.controller")
const multer = require('../middleware/storage')


module.exports = app => {
  app.get('/api/allpost/:id', PostCtrl.allPost)
  app.post('/api/poster/:eventId', multer.upload.single("image") ,PostCtrl.addNewPost)
  app.delete('/api/delete/post/:id', PostCtrl.deletePost)
}