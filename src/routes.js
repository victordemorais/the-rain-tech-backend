const express = require('express');

const InvestorsController = require('./controller/InvestorsController');
const ProfessionalsController = require('./controller/ProfessionalsController');
const SessionsController = require('../src/controller/SessionsController');

const ChatController = require('../src/controller/ChatController');

const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

// Investors api
routes.get('/investor', InvestorsController.index);
routes.post('/investor', InvestorsController.create);
routes.delete('/investor/:id', authMiddleware, InvestorsController.delete);
routes.put('/investor/:id', authMiddleware, InvestorsController.update);
routes.get(
  '/investor/recommended',
  authMiddleware,
  InvestorsController.getRecommendedProfessionals
);

// Professionals api
routes.get('/professional', ProfessionalsController.index);
routes.post('/professional', ProfessionalsController.create);
routes.delete(
  '/professional/:id',
  authMiddleware,
  ProfessionalsController.delete
);
routes.put('/professional/:id', authMiddleware, ProfessionalsController.update);
routes.get(
  '/professional/recommended',
  authMiddleware,
  ProfessionalsController.getRecommendedInvestors
);

// Session api
routes.post('/login', SessionsController.login);

// Chat api
routes.get('/chat', ChatController.index);
routes.post('/chat', ChatController.create);

routes.get('/token-test', authMiddleware, (request, response) =>
  response.json({ msg: 'ok' })
);

module.exports = routes;
