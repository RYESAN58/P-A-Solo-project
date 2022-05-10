const PostCtrl = require("../controller/post.controller")

module.exports = app => {
  app.post('/api/post/:eventId', PostCtrl.addNewPost)
}