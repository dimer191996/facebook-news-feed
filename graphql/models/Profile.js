const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  avatar: String,
  userID: String,
  cover: String,
  username: String,
  job: String,
  location: String,
  bio: String,
  createdAt: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Profile", userSchema);
