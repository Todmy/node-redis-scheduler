const redisClientBuilder = require('../../shared/redis-client');

module.exports = class EchoController {
  constructor(printer) {
    this.publisher = redisClientBuilder();
    this.subscriber = redisClientBuilder();
    this.printMsg = printer;

    this.subscribeToEvents();
  }

  subscribeToEvents() {
    this.subscriber.on('pmessage', (channel, message, value) => this.printMsg(value));
    this.subscriber.psubscribe('__key*__:del');
    this.subscriber.psubscribe('__key*__:expired');
  }

  registerMsg({ message, time }) {
    this.publisher.set(message, '');
    this.publisher.expireat(message, time);
  }
};
