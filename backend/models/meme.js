const mongoose = require("mongoose");

const memeSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
  },
});

module.exports = mongoose.model("Meme", memeSchema);
