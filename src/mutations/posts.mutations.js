const { UserInputError } = require("apollo-server");

const Post = require("../models/Post.model");
const auth = require("../util/auth");

module.exports = {
  createPost: async (
    _,
    { createPostInput: { title, content } },
    context,
    info
  ) => {
    // get user from context
    const user = auth(context);
    try {
      // create new post
      const post = await new Post({
        title,
        content,
        author: user._id,
        createdAt: new Date().toISOString(),
      });
      const res = await post.save();
      return res;
    } catch (err) {
      throw new UserInputError(err.message, {
        invalidArgs: {
          title,
          content,
        },
      });
    }
  },

  deletePost: async (_, { postId }, context, info) => {
    // get user from context
    const user = auth(context);
    try {
      // find post
      const post = await Post.findById(postId);
      if (!post) {
        throw new Error("Post not found");
      }
      // check if user is the author
      if (post.author.toString() !== user._id.toString()) {
        throw new Error("Not authorized");
      }
      await post.delete();
      return "Post deleted successfully";
    } catch (err) {
      throw new Error(err);
    }
  },
};
