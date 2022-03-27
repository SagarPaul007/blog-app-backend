const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");
require("dotenv").config();
const { MONGODB_URI } = process.env;

const typeDefs = require("./src/gql-types/typeDefs");
const resolvers = require("./src/resolvers");

const server = new ApolloServer({ typeDefs, resolvers });

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    server.listen({ port: 4000 });
  })
  .then(() => console.log("Server is running on port 4000"))
  .catch((err) => console.log(err));
