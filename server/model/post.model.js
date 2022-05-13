const mongoose = require("mongoose")

const PostSchema = mongoose.Schema({
  image: {
    type: String,
    required:[true, "Event must have a landing photo"],
    minLength: [1, 'Event must have a landing photo']
  },
  caption: {
    type: String
  },
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event"
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, {timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema)