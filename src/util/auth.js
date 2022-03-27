const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");
const { JWT_SECRET_KEY } = require("./env.variables");

const error = () => {
  throw new AuthenticationError("Authentication failed");
};

const auth = (context) => {
  const authHeader = context.req.headers.authorization;
  if (!authHeader) error();
  const token = authHeader.split(" ")[1];
  if (!token) error();
  try {
    const user = jwt.verify(token, JWT_SECRET_KEY);
    if (!user) error();
    return user;
  } catch (err) {
    error();
  }
};

module.exports = auth;
