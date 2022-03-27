const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("./env.variables");

const generateToken = (user) => {
  return jwt.sign(
    { _id: user._id, email: user.email, username: user.username },
    JWT_SECRET_KEY
  );
};

module.exports = {
  generateToken,
};
