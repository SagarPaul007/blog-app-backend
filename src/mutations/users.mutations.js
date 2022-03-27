const { gql } = require("apollo-server");
const { UserInputError } = require("apollo-server");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("email-validator");

const User = require("../models/User.model");
const { JWT_SECRET_KEY } = require("../util/env.variables");

module.exports = {
  registerUser: async (
    _,
    { registerUser: { name, username, email, password, confirmPassword } },
    context,
    info
  ) => {
    if (name.length < 3) {
      throw new UserInputError("Name must be at least 3 characters long");
    }
    if (username.length < 3) {
      throw new UserInputError("Username must be at least 3 characters long");
    }
    if (!validator.validate(email)) {
      throw new UserInputError("Email is not valid");
    }
    if (password !== confirmPassword) {
      throw new UserInputError("Passwords do not match");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new UserInputError("User already exists");
    }
    const existingUserName = await User.findOne({ username });
    if (existingUserName) {
      throw new UserInputError("Username is taken");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await new User({
        name,
        username,
        email,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
      });
      const res = await user.save();
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
    const user = await User.findOne({ email });
    if (!user) {
      throw new UserInputError("User does not exist");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new UserInputError("Invalid password");
    }
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
