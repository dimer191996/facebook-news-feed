const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  body: String,
  username: String,
  createdAt: String,
  title: String,
  image: String,
  imagePublicId: String,
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
      likes: [{ username: String, createdAt: String }],
      replies: [
        {
          body: String,
          username: String,
          createdAt: String,
          likes: [{ username: String, createdAt: String }],
        },
      ],
    },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  votes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  files: [
    {
      username: String,
      filename: String,
      mimetype: String,
      path: String,
    },
  ],
  user: { type: Schema.Types.ObjectId, user: "users" },
});

module.exports = model("Post", postSchema);
