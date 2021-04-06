const Post = require("../models/Post");

const check_auth = require("../util/check-auth");
const { UserInputError } = require("apollo-server");

module.exports = {
  Mutation: {
    async likePost(_, { postId }, context) {
      const { username } = check_auth(context);

      const post = await Post.findById(postId);

      if (post) {
        if (!!post.likes.find((like) => like.username === username)) {
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }
        await post.save();
        return post;
      } else throw new UserInputError("Post not fund");
    },
    async likeComment(_, { postId, commentId }, context) {
      const { username } = check_auth(context);

      const post = await Post.findById(postId);

      if (post) {
        const comment = post.comments.find((c) => c.id === commentId);
        if (comment) {
          try {
            if (!!comment.likes.find((like) => like.username === username)) {
              comment.likes = comment.likes.filter(
                (like) => like.username !== username
              );
            } else {
              comment.likes.unshift({
                username,
                createdAt: new Date().toISOString(),
              });
            }
          } catch (error) {
            console.log(error);
          }
          await post.save();
          return post;
        } else throw new UserInputError("Comment not fund");
      } else throw new UserInputError("Action  not allowed");
    },
    async likeReply(_, { postId, commentId, replyId }, context) {
      const { username } = check_auth(context);

      const post = await Post.findById(postId);

      if (post) {
        const comment = post.comments.find((c) => c.id === commentId);
        if (comment) {
          const reply = comment.replies.find((r) => r.id === replyId);
          if (reply) {
            if (!!reply.likes.find((like) => like.username === username)) {
              reply.likes = reply.likes.filter(
                (like) => like.username !== username
              );
            } else {
              reply.likes.unshift({
                username,
                createdAt: new Date().toISOString(),
              });
            }
            await post.save();
            return post;
          } else throw new UserInputError("Reply not fund");
        } else throw new UserInputError("Comment not fund");
      } else throw new UserInputError("Post not fund");
    },
  },
};
