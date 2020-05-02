const express = require("express");

const UsersController = require("../src/controller/UsersController");
const SessionsController = require("../src/controller/SessionsController");

const routes = express.Router();

routes.get("/", UsersController.index);

routes.post("/", UsersController.create);

routes.delete("/:id", UsersController.delete);

routes.put("/:id", UsersController.update);

routes.post("/login", SessionsController.login);

module.exports = routes;
