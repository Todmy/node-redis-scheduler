const redis = require('redis');
const { logger } = require('../helpers/logger');
const port = process.env.REDIS_PORT;
const host = process.env.REDIS_HOST;

module.exports = () => {
  const client = redis.createClient(port, host);
  client.config('SET', 'notify-keyspace-events', 'KEA');

  client.on('error', function onError(error) {
    logger.error('redis subscriber', error);
  });

  return client;
};
