const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
    followers: [Follower]!
  }
  # -----------------------------------------------------------
  type Follower {
    id: ID!
    user: User!
  }
  # -----------------------------------------------------------

  type Profile {
    id: ID!
    avatar: String
    username: String
    cover: String
    location: String
    job: String
    bio: String
    createdAt: String!
    user: User!
  }

  # -----------------------------------------------------------

  input RegisterInput {
    username: String!
    password: String!
    comfirmPassword: String!
    email: String!
  }

  input CreateProfileInput {
    avatar: String
    username: String!
    cover: String
    location: String
    job: String
    bio: String
  }

  # -----------------------------------------------------------

  type Post {
    id: ID!
    body: String!
    title: String!
    image: String
    imagePublicId: String
    createdAt: String!
    username: String!
    isUserVoted: String!
    comments: [Comment]!
    commentsCount: Int!
    votes: [Vote]!
    votesCount: Int!
    likes: [Like]!
    likesCount: Int!
    files: [File]!
  }
  # -----------------------------------------------------------

  type Comment {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    replies: [Reply]!
    likes: [Like]!
    repliesCount: Int!
    likesCount: Int!
  }
  # -----------------------------------------------------------

  type Reply {
    id: ID!
    body: String!
    createdAt: String!
    likesCount: Int!
    likes: [Like]!
    username: String!
  }
  # -----------------------------------------------------------

  type File {
    id: ID!
    username: String!
    filename: String!
    mimetype: String!
    path: String!
  }

  # -----------------------------------------------------------

  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }

  # -----------------------------------------------------------

  type Vote {
    id: ID!
    username: String!
    createdAt: String!
  }

  # -----------------------------------------------------------

  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
    getProfile(userId: ID!): Profile
  }

  # -----------------------------------------------------------
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!

    profile(createProfileInput: CreateProfileInput): Profile!
    follow(userId: ID!): Boolean!

    createPost(
      body: String!
      title: String!
      image: Upload
      imagePublicId: String
    ): Post!
    deletePost(postId: ID!): String!
    likePost(postId: ID!): Post!
    uploadFile(file: Upload!, postId: ID!): Post!
    votePost(postId: ID!): Post!

    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likeComment(postId: ID!, commentId: ID!): Post!

    createReply(commentId: ID!, postId: ID!, body: String!): Post!
    deleteReply(commentId: ID!, postId: ID!, replyId: ID!): Post!
    likeReply(postId: ID!, commentId: ID!, replyId: ID!): Post!
  }

  # -----------------------------------------------------------

  type Subscription {
    newPost: Post!
  }
`;
