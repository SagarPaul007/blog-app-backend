const userQueries = require("../queries/users.queries");
const userMutations = require("../mutations/users.mutations");

module.exports = {
  Query: {
    getUsers: userQueries.getUsers,
    getMyProfile: userQueries.getMyProfile,
    getUserProfile: userQueries.getUserProfile,
  },
  Mutation: {
    registerUser: userMutations.registerUser,
    loginUser: userMutations.loginUser,
    followUnfollowUser: userMutations.followUnfollowUser,
  },
};
