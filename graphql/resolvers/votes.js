const Post = require("../models/Post");

const check_auth = require("../util/check-auth");
const { UserInputError } = require("apollo-server");

module.exports = {
  Mutation: {
    async votePost(_, { postId }, context) {
      const { username } = check_auth(context);
      const post = await Post.findById(postId);

      if (post) {
        if (!!post.votes.find((v) => v.username === username)) {
          post.votes = post.votes.filter((v) => v.username !== username);
        } else {
          post.votes.unshift({
            username,
            createAt: new Date().toISOString(),
          });
        }
        await post.save();
        return post;
      }
    },
  },
};
