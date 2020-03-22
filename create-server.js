const express = require('express');
const app = express();
const port = process.env.SERVER_PORT;

module.exports = function(routes) {
  app.use(routes);
  app.listen(port, () => console.log(`Example ap listening on port ${port}!`));

  return app;
};