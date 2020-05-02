const jwt = require("jsonwebtoken");

module.exports = {
  generateToken(id) {
    return jwt.sign({ id }, "secret", {
      expiresIn: 604800,
    });
  },
};
