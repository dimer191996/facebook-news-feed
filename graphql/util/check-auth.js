const AuthenticationError = require("apollo-server");

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../config");

module.exports = (context) => {
  //context = {... hearder}
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch {
        throw new Error("Invalid / Expire token");
      }
    }
    throw new Error("Authentification must be 'Bearer [token]");
  }
  throw new Error("Authentification must be approved ");
};
