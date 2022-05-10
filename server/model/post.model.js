const mongoose = require("mongoose")

const PostSchema = mongoose.Schema({
  image: {
    type: String,
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