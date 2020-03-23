// TODO: the logic of this file should be splitted to server.js and app.js in the future.
// Currently, it is skipped for simplicity.
const express = require('express');
const helmet = require('helmet');
const { expressLogger: logger } = require('./services/logger');
const gracefullShutdown = require('./services/graceful-shutdown');
const errorHandler = require('./services/error-handler');
const port = process.env.SERVER_PORT;

const app = express();

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger);

gracefullShutdown(app);

module.exports = function serverBuilder(routes) {
  app.use(...routes);

  app.use(errorHandler);

  app.listen(port, () => console.log(`Example ap listening on port ${port}!`)); // eslint-disable-line no-console

  return app;
};
