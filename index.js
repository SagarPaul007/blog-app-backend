const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");

const { MONGODB_URI } = require("./src/util/env.variables");
const typeDefs = require("./src/gql");
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
