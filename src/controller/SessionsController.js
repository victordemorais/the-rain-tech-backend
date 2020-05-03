const connection = require("../data/connection");
const bcrypt = require("bcrypt");
const authConfig = require("../utils/authConfig");

module.exports = {
  async login(request, response) {
    const table = request.body.isInvestor ? "investors" : "professionals";

    try {
      const { email, password } = request.body;

      let content = "";

      await connection(table)
        .where("email", email)
        .first()
        .then(async function (row) {
          if (row) {
            if (await bcrypt.compare(password, row.password)) {
              content = { user: row, token: authConfig.generateToken(row.id) };
            } else {
              content = "Wrong password!";
            }
          } else {
            content = "User not Found!";
          }
        });

      return response.json({ content });
    } catch (error) {
      response.status(500).json({ error: "Error during update." });
    }
  },
};
