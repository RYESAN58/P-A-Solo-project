const {register, login, logout } = require("../controller/user.controller")
const User = require("../model/user.model")


module.exports = (app) => {
  app.post("/api/register", register)
  app.post("/api/login", login)
  app.post('/api/logout', logout)
}