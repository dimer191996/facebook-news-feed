const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: String,
  password: String,
  followers: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
    },
  ],
  email: String,
  createdAt: String,
});

module.exports = model("User", userSchema);
