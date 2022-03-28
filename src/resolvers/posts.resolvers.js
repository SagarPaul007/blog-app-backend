const postQueries = require("../queries/posts.queries");
const postMutations = require("../mutations/posts.mutations");

module.exports = {
  Query: {
    getPosts: postQueries.getPosts,
    getPostsForProfile: postQueries.getPostsForProfile,
    getPostsByUserId: postQueries.getPostsByUserId,
  },
  Mutation: {
    createPost: postMutations.createPost,
    deletePost: postMutations.deletePost,
    updatePost: postMutations.updatePost,
    likeUnlikePost: postMutations.likeUnlikePost,
  },
};
