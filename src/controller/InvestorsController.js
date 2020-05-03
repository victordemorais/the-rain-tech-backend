const connection = require("../data/connection");
const bcrypt = require("bcrypt");
const profileRecommender = require("../utils/profileRecommender");

module.exports = {
  async create(request, response) {
    try {
      const {
        name,
        email,
        password,
        phone,
        city,
        uf,
        investor_profile,
      } = request.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      await connection("investors").insert({
        name,
        email,
        password: hashedPassword,
        phone,
        city,
        uf,
        investor_profile,
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

      const { name, email, phone, city, uf, investor_profile } = request.body;

      await connection("investors").where("id", id).update({
        name,
        email,
        phone,
        city,
        uf,
        investor_profile,
      });

      return response.json({
        name,
        email,
        phone,
        city,
        uf,
        investor_profile,
        msg: "User updated with success!",
      });
    } catch (error) {
      response.status(500).json({ error: "Error during update." });
    }
  },

  async getRecommendedProfessionals(request, response) {
    const user = await connection("investors")
      .select("investor_profile")
      .where("id", request.userId);

    try {
      const professionals = await connection("professionals")
        .select("*")
        .from("professionals")
        .orderByRaw(
          profileRecommender.getRecommendationQuery(user[0].investor_profile)
        );

      return response.json({ professionals });
    } catch (error) {
      response.status(500).json({ error: "Error during get professionals." });
    }
  },
};
