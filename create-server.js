const express = require('express');
const app = express();
const port = process.env.SERVER_PORT;

module.exports = function serverBuilder(routes) {
  app.use(...routes);

  app.listen(port, () => console.log(`Example ap listening on port ${port}!`)); // eslint-disable-line no-console

  return app;
};
