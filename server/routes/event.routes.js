const eventCtrl = require("../controller/event.controller")
const jwtMiddleware = require("../middleware/jwt.middleware")


module.exports = app => {
  app.post('/api/post', jwtMiddleware.authenticate , eventCtrl.addNewEvent);
}