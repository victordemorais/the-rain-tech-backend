const connection = require("../data/connection");
const bcrypt = require("bcrypt");

module.exports = {
  async create(request, response) {
    try {
      const { name, email, password, phone, city, uf } = request.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      await connection("investors").insert({
        name,
        email,
        password: hashedPassword,
        phone,
        city,
        uf,
      });

      return response.json({
        name,
        email,
        password: hashedPassword,
        phone,
        city,
        uf,
        msg: "User created with success!",
      });
    } catch (error) {
      response.status(500).json({ error: "Error during create." });
    }
  },

  async index(request, response) {
    try {
      const investors = await connection("investors").select("*");
      return response.json(investors);
    } catch (error) {
      response.status(500).json({ error: "Error during get investors." });
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;

      await connection("investors").where("id", id).del();

      return response.json({ msg: `User ${id} deleted!` });
    } catch (error) {
      response.status(500).json({ error: "Error during delete." });
    }
  },

  async update(request, response) {
    try {
      const { id } = request.params;

      const { name, email, phone, city, uf } = request.body;

      await connection("investors").where("id", id).update({
        name,
        email,
        phone,
        city,
        uf,
      });

      return response.json({
        name,
        email,
        phone,
        city,
        uf,
        msg: "User updated with success!",
      });
    } catch (error) {
      response.status(500).json({ error: "Error during update." });
    }
  },
};
