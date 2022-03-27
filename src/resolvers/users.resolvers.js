const userQueries = require("../queries/users.queries");

module.exports = {
  Query: {
    getUsers: userQueries.getUsers,
  },
};
