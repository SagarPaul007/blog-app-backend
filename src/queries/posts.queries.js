const Post = require("../models/Post.model");

module.exports = {
  getPosts: async () => {
    try {
      const posts = await Post.find();
      return posts;
    } catch (err) {
      throw err;
    }
  },
};
