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
  image: {
    type: String,
    required:[true, "Event must have a landing photo"],
    minLength: [1, 'Event must have a landing photo']
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
},{ timestamps: true });

const Event = mongoose.model("Event", eventSchema)

module.exports = Event