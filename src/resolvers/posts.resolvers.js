const postQueries = require("../queries/posts.queries");

module.exports = {
  Query: {
    getPosts: postQueries.getPosts,
  },
};
