const Post = require("../models/Post");

const check_auth = require("../util/check-auth");
const { UserInputError } = require("apollo-server");

const { validateReplyInput } = require("../util/validators");

module.exports = {
  Mutation: {
    async createReply(_, { postId, commentId, body }, context) {
      const { username } = check_auth(context);
      const { valid, errors } = validateReplyInput(body);
      if (!valid) {
        throw new UserInputError("Empty Reply field", {
          errors,
        });
      }
      try {
        const post = await Post.findById(postId);
        if (post) {
          const comment = post.comments.find((c) => c.id === commentId);
          if (comment) {
            comment.replies.unshift({
              body,
              username,
              createdAt: new Date().toISOString(),
            });
            await post.save();
            return post;
          } else throw new UserInputError("Comment not Found");
        } else throw new UserInputError("Post not Found");
      } catch (err) {
        throw new Error(err);
      }
    },
    async deleteReply(_, { postId, commentId, replyId }, context) {
      const { username } = check_auth(context);

      const post = await Post.findById(postId);

      if (post) {
        const comment = post.comments.find((c) => c.id === commentId);
        if (comment) {
          const replyIndex = comment.replies.findIndex((r) => r.id === replyId);
          if (comment.replies[replyIndex].username === username) {
            comment.replies.splice(replyIndex, 1);
            await post.save();
            return post;
          } else throw new AuthenticationError("Action  not allowed");
        } else throw new UserInputError("Comment  not fund");
      } else throw new UserInputError("Post  not fund");
    },
  },
};
