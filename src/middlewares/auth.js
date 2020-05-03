const jwt = require("jsonwebtoken");
const authConfig = require("../utils/authConfig");
const { promisify } = require("util");

module.exports = async (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ error: "Token not provided" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.getSecret());

    request.userId = decoded.id;

    return next();
  } catch (error) {
    response.status(401).json({
      error: "Invalid token",
    });
  }
};
