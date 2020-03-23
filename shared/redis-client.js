const redis = require('redis');
const { logger } = require('../helpers/logger');
const port = process.env.REDIS_PORT;
const host = process.env.REDIS_HOST;

module.exports = ({ db = 0, notifyKeyspaceEvents = false } = {}) => {
  const client = redis.createClient({ port, host, db });
  if (notifyKeyspaceEvents) {
    client.config('SET', 'notify-keyspace-events', 'KEA');
  }

  client.on('error', function onError(error) {
    logger.error('redis subscriber', error);
  });

  return client;
};
