const pick = require('lodash.pick');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');
const config = require('../config');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const sessionStore = require('./sessionStore');
const Raven = require('raven');
const cors = require('cors');
const bearerToken = require('express-bearer-token');

module.exports = function (app) {
  app.root = path.resolve(__dirname, '..', '..');

  if (config.app.sentry.secret) {
    const dsn = `https://${config.app.sentry.public}:${config.app.sentry.secret}@sentry.io/2236469`;
    Raven.config(dsn).install();
  }

  app.set('views', path.resolve(app.root, 'api', 'views'));
  app.set('view engine', 'pug');

  app.use(cors({
    origin: function (origin, next) {
      return next(null, true);
    }
  }));
  app.use(bearerToken());

  app.use(require('body-parser').urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser(config.app.cookieSecret));
  app.use(express.static(path.resolve(app.root, 'public')));

  app.use(session({
    secret: config.app.sessionSecret,
    resave: true,
    saveUninitialized: true,
    store: sessionStore
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(function (req, res, next) {
    res.setHeader('X-Dust', 'Ashes to ashes, dust to dust.');
    next();
  });

  app.use(function (req, res, next) {
    if (config.app.sentry.secret) {
      const user = {
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
      };
      if (req.user) {
        Object.assign(user, pick(req.user, 'id', 'username'));
      }

      Raven.setContext({ user });
    }
    next();
  });
};
