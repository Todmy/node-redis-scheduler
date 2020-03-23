const redisClientBuilder = require('../../shared/redis-client');

const parseKeyValue = (keyValue) => {
  const devider = ':';
  const indexOfDevider = keyValue.indexOf(devider);
  const key = keyValue.slice(0, indexOfDevider);
  const value = keyValue.slice(indexOfDevider + 1);

  return [key, value];
};

module.exports = class EchoController {
  constructor(rStorage, printer) {
    this.schedulerInstance = 0;
    this.publisher = redisClientBuilder({ notifyKeyspaceEvents: true, db: this.schedulerInstance });
    this.subscriber = redisClientBuilder({ db: this.schedulerInstance });
    this.storage = rStorage;
    this.printMsg = printer;

    this.subscribeToEvents();
    this.printOutdatedMessages();
  }

  subscribeToEvents() {
    this.subscriber.on('pmessage', (chnl, msg, value) => {
      const [time, message] = parseKeyValue(value);
      this.storage.executeIfExist(time, () => this.printMsg(message));
    });

    this.subscriber.psubscribe(`__key*${this.schedulerInstance}__:del`);
    this.subscriber.psubscribe(`__key*${this.schedulerInstance}__:expired`);
  }

  printOutdatedMessages() {
    // TODO: should be optimized
    this.publisher.keys('*', (pErr, publisherKeys) => {
      this.storage.getDifference(publisherKeys, (err, repl) => repl.forEach(this.printMsg));
    });
  }

  registerMsg({ message, time }) {
    const value = `${time}:${message}`;
    this.storage.set(time, message);
    this.publisher.set(value, '');
    this.publisher.expireat(value, time);
  }
};
