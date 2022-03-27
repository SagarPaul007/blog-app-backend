const { model, Schema } = require("mongoose");

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "posts",
    required: true,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
