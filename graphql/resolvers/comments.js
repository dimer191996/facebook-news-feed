const Post = require("../models/Post");

const check_auth = require("../util/check-auth");
const { UserInputError } = require("apollo-server");

const { AuthenticationError } = require("apollo-server");
const { validateCommentInput } = require("../util/validators");

module.exports = {
  Mutation: {
    async createComment(_, { postId, body }, context) {
      const { username } = check_auth(context);
      const { valid, errors } = validateCommentInput(body);
      if (!valid) {
        throw new UserInputError("Empty Comment field", {
          errors,
        });
      }
      try {
        const post = await Post.findById(postId);

        if (post) {
          post.comments.unshift({
            body,
            username,
            createdAt: new Date().toISOString(),
          });
          await post.save();
          return post;
        } else throw new UserInputError("Post not Found");
      } catch (err) {
        throw new Error(err);
      }
    },
    async deleteComment(_, { postId, commentId }, context) {
      const { username } = check_auth(context);

      const post = await Post.findById(postId);

      if (post) {
        const commentIndex = post.comments.findIndex((c) => c.id === commentId);
        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else throw new AuthenticationError("Action  not allowed");
      } else throw new UserInputError("Post  not fund");
    },
  },
};
