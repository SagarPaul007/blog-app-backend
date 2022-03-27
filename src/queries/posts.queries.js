const Post = require("../models/Post.model");

module.exports = {
  getPosts: async () => {
    try {
      const posts = await Post.find()
        .sort({ createdAt: -1 })
        .populate("author");

      return posts;
    } catch (err) {
      throw err;
    }
  },
};
