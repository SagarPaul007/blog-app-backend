const { gql } = require("apollo-server");

module.exports = gql`
  # inputs
  input RegisterUser {
    name: String!
    email: String!
    username: String!
    password: String!
    confirmPassword: String!
  }

  input LoginUser {
    email: String!
    password: String!
  }

  # types
  type User {
    _id: ID!
    name: String!
    email: String!
    username: String!
    posts: [Post]
    createdAt: String!
    followers: [User]
    following: [User]
    token: String!
  }

  type Post {
    _id: ID!
    title: String!
    content: String!
    author: User!
    createdAt: String!
    likes: [User]
    comments: [Comment]
  }

  type Comment {
    _id: ID!
    content: String!
    author: User!
    post: Post!
    likes: [User]
    createdAt: String!
  }

  type Query {
    getUsers: [User]
    getPosts: [Post]
  }

  type Mutation {
    registerUser(registerUser: RegisterUser!): User
    loginUser(loginUser: LoginUser!): User
  }
`;
