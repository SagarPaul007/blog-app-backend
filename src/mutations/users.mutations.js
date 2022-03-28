const { UserInputError } = require("apollo-server");
const bcrypt = require("bcryptjs");

const User = require("../models/User.model");
const validate = require("../util/validate");
const { generateToken } = require("../util/token");
const auth = require("../util/auth");

module.exports = {
  registerUser: async (
    _,
    { registerUser: { name, username, email, password, confirmPassword } },
    context,
    info
  ) => {
    // validate user input
    validate({ name, email, username, password, confirmPassword });

    // check if user/username already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new UserInputError("User already exists");
    }
    const existingUserName = await User.findOne({ username });
    if (existingUserName) {
      throw new UserInputError("Username is taken");
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      // create new user
      const user = await new User({
        name,
        username,
        email,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
      });
      const res = await user.save();

      // create token
      const token = generateToken(res);

      return {
        ...res._doc,
        token,
      };
    } catch (err) {
      throw new UserInputError(err.message, {
        invalidArgs: {
          name,
          username,
          email,
          password,
          confirmPassword,
        },
      });
    }
  },

  loginUser: async (_, { loginUser: { email, password } }, context, info) => {
    // validate user input
    validate({ email, password });

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      throw new UserInputError("User does not exist");
    }

    // check if password is correct
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new UserInputError("Invalid password");
    }

    // generate token
    const token = generateToken(user);

    return {
      ...user._doc,
      token,
    };
  },

  followUnfollowUser: async (_, { userId }, context, info) => {
    // get user from context
    const userFromContext = auth(context);
    const user = await User.findById(userFromContext._id);
    try {
      // find user
      const userToFollow = await User.findById(userId);
      if (!userToFollow) {
        throw new Error("User not found");
      }

      // check if already following
      const isFollowing = user.following.some(
        (id) => id.toString() === userId.toString()
      );
      if (isFollowing) {
        // unfollow user
        const following = user.following.filter(
          (id) => id.toString() !== userId.toString()
        );
        const followers = userToFollow.followers.filter(
          (id) => id.toString() !== user._id.toString()
        );
        user.following = following;
        userToFollow.followers = followers;
      } else {
        // follow user
        user.following.push(userId);
        userToFollow.followers.push(user._id);
      }

      await user.save();
      await userToFollow.save();

      return user;
    } catch (err) {
      throw new Error(err);
    }
  },
};
