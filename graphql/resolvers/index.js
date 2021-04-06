const usersResolvers = require("./users");
const postsResolvers = require("./posts");
const commentsResolvers = require("./comments");
const repliesResolvers = require("./replies");
const likesResolvers = require("./likes");
const votePostsResolvers = require("./votes");
const profileResolvers = require("./profile");
const Auth_check = require("../util/check-auth");

module.exports = {
  Post: {
    likesCount: (parent) => parent.likes.length,
    commentsCount: (parent) => parent.comments.length,
    votesCount: (parent) => parent.votes.length,
    isUserVoted: (parent, _, context) => {
      try {
        const { username } = Auth_check(context);
        const user_vote = !!parent.votes.find(
          (user) => user.username === username
        );
        return user_vote ? "true" : "false";
      } catch (error) {
        return "null";
      }
    },
  },
  Comment: {
    repliesCount: (parent) => parent.replies.length,
    likesCount: (parent) => parent.likes.length,
  },
  Reply: {
    likesCount: (parent) => parent.likes.length,
  },
  Query: {
    ...postsResolvers.Query,
    ...profileResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation,
    ...repliesResolvers.Mutation,
    ...likesResolvers.Mutation,
    ...votePostsResolvers.Mutation,
  },
  Subscription: {
    ...postsResolvers.Subscription,
  },
};
