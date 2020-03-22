const winston = require('winston');
const expressWinston = require('express-winston');

const logger = expressWinston.logger({
  transports: [
    new winston.transports.Console(),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
  ),
  meta: true,
  expressFormat: true,
});

module.exports = logger;
