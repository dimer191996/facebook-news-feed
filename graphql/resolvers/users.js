const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { UserInputError } = require("apollo-server");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../util/validators");
const { SECRET_KEY } = require("../../config");
const User = require("../models/User");
const Profile = require("../models/Profile");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}
module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { valid, errors } = validateLoginInput(username, password);

      if (!valid) {
        throw new UserInputError("Wrong credentials", {
          errors,
        });
      }

      const user = await User.findOne({ username });

      if (!user) {
        errors.general = "User Not Found";
        throw new UserInputError("User not fund ", {
          errors,
        });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        errors.general = "Wrong password";
        throw new UserInputError("Wrong password", {
          errors,
        });
      }
      //if correct let essue a token for the login user
      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(
      _,
      { registerInput: { username, password, email, comfirmPassword } }
    ) {
      // 1) Validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        comfirmPassword
      );
      if (!valid) {
        throw new UserInputError("errors", { errors });
      }

      //2) Make sure to check if the user exist
      const user = await User.findOne({ email });
      if (user) {
        throw new UserInputError("Email is taken ", {
          errors: {
            email: "This Email  is already taken ",
          },
        });
      }

      //3) hash the password and create an authenticated user
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      //4) create a profile for the new authenticated userProfiless
      const newProfile = new Profile({
        username,
        userId: res.id,
        createdAt: new Date().toISOString(),
        user: newUser,
      });

      await newProfile.save();

      //5) issue a token to the authenticated user
      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
