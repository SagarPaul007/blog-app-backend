const postResolvers = require("./posts.resolvers");
const userResolvers = require("./users.resolvers");

module.exports = {
  Query: {
    ...postResolvers.Query,
    ...userResolvers.Query,
  },
  Mutation: {
    ...postResolvers.Mutation,
    ...userResolvers.Mutation,
  },
};
