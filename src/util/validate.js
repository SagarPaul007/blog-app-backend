const { UserInputError } = require("apollo-server");
const validator = require("validator");

const validate = ({ name, email, username, password, confirmPassword }) => {
  if (name && name.length < 3) {
    throw new UserInputError("Name must be at least 3 characters long");
  }
  if (username && username.length < 3) {
    throw new UserInputError("Username must be at least 3 characters long");
  }
  if (email && !validator.isEmail(email)) {
    throw new UserInputError("Email is not valid");
  }
  if (password && password.length < 8) {
    throw new UserInputError("Password must be at least 8 characters long");
  }
  if (
    password &&
    confirmPassword &&
    !validator.equals(password, confirmPassword)
  ) {
    throw new UserInputError("Passwords do not match");
  }
};

module.exports = validate;
