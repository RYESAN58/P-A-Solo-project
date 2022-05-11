const eventCtrl = require("../controller/event.controller")
const jwtMiddleware = require("../middleware/jwt.middleware")


module.exports = app => {
  app.get("/api/getAll", eventCtrl.getAll)
  app.post('/api/post', jwtMiddleware.authenticate , eventCtrl.addNewEvent);
}