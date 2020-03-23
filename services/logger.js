const winston = require('winston');
const expressWinston = require('express-winston');

const config = {
  transports: [
    new winston.transports.Console(),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
  ),
  meta: true,
  expressFormat: true,
};

const logger = winston.createLogger(config);
const expressLogger = expressWinston.logger(config);

module.exports = {
  logger,
  expressLogger,
};
