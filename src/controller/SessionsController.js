const connection = require("../data/connection");
const bcrypt = require("bcrypt");
const auth = require("../Utils/auth");

module.exports = {
  async login(request, response) {
    try {
      const { email, password } = request.body;

      let content = "";

      await connection("users")
        .where("email", email)
        .first()
        .then(async function (row) {
          if (row) {
            if (await bcrypt.compare(password, row.password)) {
              content = { user: row, token: auth.generateToken(row.id) };
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
