const express = require('express');
const helmet = require('helmet');
const logger = require('./logger');

const server = express();

server.use(helmet());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(logger);

const port = process.env.SERVER_PORT;

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received. Closing http server.'); // eslint-disable-line no-console
  server.close(() => {
    console.log('Http server closed.'); // eslint-disable-line no-console
  });
});

module.exports = function serverBuilder(routes) {
  server.use(...routes);

  server.listen(port, () => console.log(`Example ap listening on port ${port}!`)); // eslint-disable-line no-console

  return server;
};
