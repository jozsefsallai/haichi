const homeController = require('../controllers/home/homeController');
const sessionsController = require('../controllers/sessions/sessionsController');

const errorHandler = require('./errorHandler');

function ensureAuthenticated(req, res, next) {
  if (!req.user) {
    if (req.accepts('html')) {
      return res.redirect('/login');
    }
    return res.status(403).json({ ok: false });
  }
  return next();
}

function ensureAnonymous(req, res, next) {
  if (req.user) {
    if (req.accepts('html')) {
      return res.redirect('/user');
    }
    return res.status(403).json({ ok: false });
  }
  return next();
}

module.exports = function (app) {
  app.get('/', homeController.index);

  app.post('/login', ensureAnonymous, sessionsController.create);
  app.post('/logout', ensureAuthenticated, sessionsController.destroy);

  app.get('*', homeController.index);

  app.use(errorHandler);
};
