module.exports = function gracefulShutdown(server) {
  process.on('SIGTERM', () => {
    console.info('SIGTERM signal received. Closing http server.'); // eslint-disable-line no-console
    server.close(() => {
      console.log('Http server closed.'); // eslint-disable-line no-console
    });
  });
};
