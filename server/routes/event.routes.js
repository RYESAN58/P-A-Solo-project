const eventCtrl = require("../controller/event.controller")
const multer = require('../middleware/storage')


module.exports = app => {
  app.get("/api/getAll", eventCtrl.getAll)
  app.post('/api/post', multer.upload.single("image") , eventCtrl.addNewEvent);
}