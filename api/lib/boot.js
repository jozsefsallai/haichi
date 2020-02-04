const log = require('./logger');
const config = require('../config');

module.exports = function (app) {
  return app.listen(config.app.listenPort, function () {
    log(`App started on port ${config.app.listenPort}.`);
  });
};
