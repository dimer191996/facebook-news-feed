const Post = require("../models/Post");
var fs = require("fs");
const check_auth = require("../util/check-auth");
const { validatePostFormInput } = require("../util/validators");
const { UserInputError } = require("apollo-server");
module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ username: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          console.log("not fund");
          throw new Error("Post not fund ");
        }
      } catch (err) {
        console.log("not fund 2");
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createPost(_, { body, title, image }, context) {
      const user = check_auth(context);
      console.log(image);

      if (image) {
      }
      const { errors, valid } = validatePostFormInput(body, title);
      if (!valid) {
        throw new UserInputError("Something Went Wrong", {
          errors,
        });
      }
      const newPost = new Post({
        body,
        title,

        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();

      context.pubSub.publish("NEW_POST", {
        newPost: post,
      });

      return post;
    },
    async deletePost(_, { postId }, context) {
      const user = check_auth(context);

      try {
        const post = await Post.findById(postId);
        if (post.username === user.username) {
          await post.delete();

          return "Post has been deleted";
        } else {
          throw new Error(" Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Subscription: {
    newPost: {
      subscribe: (_, __, { pubSub }) => pubSub.asyncIterator("NEW_POST"),
    },
  },
};
