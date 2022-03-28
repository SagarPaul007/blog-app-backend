const Post = require("../models/Post.model");
const auth = require("../util/auth");

module.exports = {
  getPosts: async () => {
    try {
      const posts = await Post.find()
        .sort({ createdAt: -1 })
        .populate("author")
        .populate("likes");

      return posts;
    } catch (err) {
      throw err;
    }
  },

  getPostsForProfile: async (_, args, context, info) => {
    const user = auth(context);
    try {
      const posts = await Post.find({ author: user._id })
        .populate("likes")
        .sort({
          createdAt: -1,
        });

      return posts;
    } catch (err) {
      throw err;
    }
  },

  getPostsByUserId: async (_, { userId }, context, info) => {
    try {
      const posts = await Post.find({ author: userId })
        .populate("likes")
        .sort({ createdAt: -1 });

      return posts;
    } catch (err) {
      throw err;
    }
  },
};
