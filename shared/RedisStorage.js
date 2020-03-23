const redisClientBuilder = require('../services/redis-client');

class RedisStorage {
  constructor() {
    this.keyUnixTimestampName = 'lastUnixTimestamp';
    this.storage = redisClientBuilder({ db: 1 });
  }

  set(key, value, cb) {
    this.storage.set(key, value, cb);
  }

  getDifference(keys, cb) {
    this.storage.keys('*', (err, storageKeys) => {
      if (storageKeys.length === keys.length) return;

      const absentKeys = storageKeys.filter(k1 => !keys.some(k2 => k2.startsWith(k1)));

      this.storage.mget(absentKeys, cb);

      absentKeys.forEach(key => this.storage.del(key));
    });
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
