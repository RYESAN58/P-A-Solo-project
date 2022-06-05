const eventCtrl = require("../controller/event.controller")
const multer = require('../middleware/storage')


module.exports = app => {
  app.get("/api/getAll", eventCtrl.getAll)
  app.get('/api/one/:id', eventCtrl.findOneEvent)
  app.put('/api/edit/:id' , multer.upload.single("image") ,eventCtrl.updateEvent)
  app.post('/api/post', multer.upload.single("image") , eventCtrl.addNewEvent);
  app.delete('/api/delete/:id', eventCtrl.deleteEvent)
}