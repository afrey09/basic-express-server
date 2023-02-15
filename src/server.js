'use strict';

const express = require('express');
const notFound = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
// const stamper = require('./middleware/stamper');
//const logger = require('./middleware/logger');
const validator = require('./middleware/validator');

const PORT = process.env.PORT || 3002;

const app = express();

// app.use(express.json());
// app.use(logger);

app.get('/', (req, res) => {

  const message = `server working`;

  res.status(200).send(message);
});

app.get('/person', validator, (req,res) => {

  const name = {
    name: req.query.name,
  };
  res.status(200).json(name);
});


function start() {
  app.listen(PORT, () => console.log(`listening on ${PORT}`));
}

app.use('*', notFound);
app.use(errorHandler);

module.exports = { start, app };

