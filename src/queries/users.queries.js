const User = require("../models/User.model");

module.exports = {
  getUsers: async () => {
    try {
      const users = await User.find();
      return users;
    } catch (err) {
      throw err;
    }
  },
};
