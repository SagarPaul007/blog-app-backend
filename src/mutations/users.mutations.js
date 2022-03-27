const { gql } = require("apollo-server");
const { UserInputError } = require("apollo-server");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User.model");
const { JWT_SECRET_KEY } = require("../util/env.variables");
const validate = require("../util/validate");

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
      const token = jwt.sign(
        { id: res._id, email: res.email, username: res.email },
        process.env.JWT_SECRET_KEY
      );

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
    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      process.env.JWT_SECRET_KEY
    );

    return {
      ...user._doc,
      token,
    };
  },
};
