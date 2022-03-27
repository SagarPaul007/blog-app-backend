const postQueries = require("../queries/posts.queries");
const postMutations = require("../mutations/posts.mutations");

module.exports = {
  Query: {
    getPosts: postQueries.getPosts,
  },
  Mutation: {
    createPost: postMutations.createPost,
    deletePost: postMutations.deletePost,
    updatePost: postMutations.updatePost,
    likePost: postMutations.likePost,
  },
};
