const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

class App {
  constructor() {
    this.express = express();
    this.express.use(cors());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(bodyParser.json());
    this.isDev = process.env.NODE_ENV !== 'production';

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
  }

  routes() {
    this.express.use(require('./routes'));
    this.express.use(require('./chat/routes'));
  }
}

module.exports = new App().express;
