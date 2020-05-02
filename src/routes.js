const express = require("express");

const InvestorsController = require("./controller/InvestorsController");
const ProfessionalsController = require("./controller/ProfessionalsController");
const SessionsController = require("../src/controller/SessionsController");

const routes = express.Router();

routes.get("/investor", InvestorsController.index);
routes.post("/investor", InvestorsController.create);
routes.delete("/investor/:id", InvestorsController.delete);
routes.put("/investor/:id", InvestorsController.update);

routes.get("/professional", ProfessionalsController.index);
routes.post("/professional", ProfessionalsController.create);
routes.delete("/professional/:id", ProfessionalsController.delete);
routes.put("/professional/:id", ProfessionalsController.update);

routes.post("/login", SessionsController.login);

module.exports = routes;
