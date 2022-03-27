const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    username: String!
    posts: [Post]
  }

  type Post {
    _id: ID!
    title: String!
    content: String!
    author: User!
  }

  type Query {
    getUsers: [User]
    getPosts: [Post]
  }
`;
