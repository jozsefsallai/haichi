const pick = require('lodash.pick');
const config = require('../config');
const session = require('express-session');

var SessionStoreClass = null;
var options = {};

switch (config.app.sessionDriver) {
  case 'file':
    SessionStoreClass = require('session-file-store')(session);
    break;
  /* istanbul ignore next */
  case 'redis':
    SessionStoreClass = require('connect-redis')(session);
    options = pick(config.redis, 'host', 'port');
    break;
}

module.exports = new SessionStoreClass(options);
