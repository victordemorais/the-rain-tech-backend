const jwt = require("jsonwebtoken");

module.exports = {
  getSecret() {
    return "secret";
  },

  generateToken(id) {
    return jwt.sign({ id }, this.getSecret(), {
      expiresIn: 604800,
    });
  },
};
