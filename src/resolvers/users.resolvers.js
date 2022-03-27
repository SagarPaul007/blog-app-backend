const userQueries = require("../queries/users.queries");
const userMutations = require("../mutations/users.mutations");

module.exports = {
  Query: {
    getUsers: userQueries.getUsers,
  },
  Mutation: {
    registerUser: userMutations.registerUser,
    loginUser: userMutations.loginUser,
  },
};
