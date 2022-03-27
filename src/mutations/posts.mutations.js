const { UserInputError } = require("apollo-server");

const User = require("../models/User.model");
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
      const author = await User.findById(res.author);
      author.posts.push(res._id);
      await author.save();
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
      const author = await User.findById(post.author);
      const postsOfAuthor = author.posts.filter(
        (id) => id.toString() !== postId.toString()
      );
      author.posts = postsOfAuthor;
      await author.save();
      return "Post deleted successfully";
    } catch (err) {
      throw new Error(err);
    }
  },

  updatePost: async (_, { postId, title, content }, context, info) => {
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
      // update post
      post.title = title;
      post.content = content;
      await post.save();
      return post;
    } catch (err) {
      throw new Error(err);
    }
  },

  likePost: async (_, { postId }, context, info) => {
    // get user from context
    const user = auth(context);
    try {
      // find post
      const post = await Post.findById(postId);
      if (!post) {
        throw new Error("Post not found");
      }
      // check if user has already liked the post
      if (post.likes.some((like) => like.toString() === user._id.toString())) {
        throw new Error("User already liked this post");
      }
      // add user to likes array
      post.likes.push(user._id);
      await post.save();
      return post;
    } catch (err) {
      throw new Error(err);
    }
  },
};
