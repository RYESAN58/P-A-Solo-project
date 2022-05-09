const mongoose = require('mongoose')


const eventSchema = mongoose.Schema({
  title:{
    type: String,
    required: [true, "Event Must have a name"]
  },
  description: {
    type: String,
    required: [true, "Description of event is required!"]
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Event = mongoose.model("Event", eventSchema)

module.exports = Event