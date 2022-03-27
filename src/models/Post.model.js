const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "comments",
    },
  ],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
});

module.exports = model("posts", postSchema);
