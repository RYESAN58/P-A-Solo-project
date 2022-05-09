const eventCtrl = require("../controller/event.controller")


module.exports = app => {
  app.post('/api/post', eventCtrl.addNewEvent);
}