const User = require("../models/User.model");
const auth = require("../util/auth");

module.exports = {
  getUsers: async () => {
    try {
      const users = await User.find();
      return users;
    } catch (err) {
      throw err;
    }
  },

  getMyProfile: async (_, args, context, info) => {
    const user = auth(context);
    try {
      const userProfile = await User.findById(user._id)
        .populate("posts")
        .populate("followers")
        .populate("following");
      return userProfile;
    } catch (err) {
      throw err;
    }
  },

  getUserProfile: async (_, { userId }, context, info) => {
    try {
      const userProfile = await User.findById({ _id: userId })
        .populate("posts")
        .populate("followers")
        .populate("following");
      return userProfile;
    } catch (err) {
      throw err;
    }
  },
};
