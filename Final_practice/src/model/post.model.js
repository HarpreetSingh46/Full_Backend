const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  capiton: String,
  imageUrl: {
    type: String,
    default: "",
  },
  user: {
    ref: "user",
    type: mongoose.Schema.Types.ObjectId,
  },
});

const postModel = mongoose.model("posts", postSchema);

module.exports = postModel;
