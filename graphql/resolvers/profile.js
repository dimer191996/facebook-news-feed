const Profile = require("../models/Profile");
const checkAuth = require("../util/check-auth");
module.exports = {
  Query: {
    async getProfile(_, { userId }, context) {
      const user = checkAuth(context);
      if (!user) return;
      try {
        const profile = await Profile.findOne({ user: userId }).populate(
          "user"
        );
        if (profile) {
          return profile;
        } else {
          throw new Error("Profile not fund ");
        }
      } catch (err) {
        console.log("not fund ");
        throw new Error(err);
      }
    },
  },
};
