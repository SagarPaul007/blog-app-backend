const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "posts",
    },
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
});

module.exports = model("users", userSchema);
