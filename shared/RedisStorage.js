const redisClientBuilder = require('../shared/redis-client');

class RedisStorage {
  constructor() {
    this.keyUnixTimestampName = 'lastUnixTimestamp';
    this.storage = redisClientBuilder({ db: 1 });
  }

  set(key, value, cb) {
    this.storage.set(key, value, cb);
  }

  executeIfExist(key, cb) {
    this.storage.multi()
      .get(key)
      .del(key)
      .exec((err, [isExist]) => {
        if (isExist) {
          cb();
        }
      });
  }
}

module.exports = new RedisStorage();
