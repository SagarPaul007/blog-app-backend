require("dotenv").config();
const { JWT_SECRET_KEY, MONGODB_URI } = process.env;

module.exports = {
  JWT_SECRET_KEY,
  MONGODB_URI,
};
