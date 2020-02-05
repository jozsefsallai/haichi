const anagramsController = require('../controllers/anagrams/anagramsController');
const homeController = require('../controllers/home/homeController');
const keysController = require('../controllers/keys/keysController');
const sessionsController = require('../controllers/sessions/sessionsController');
const usersController = require('../controllers/users/usersController');

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

  app.post('/api/users', ensureAnonymous, usersController.create);
  app.put('/api/users', ensureAuthenticated, usersController.update);

  app.get('/api/keys', ensureAuthenticated, keysController.get);
  app.post('/api/keys', ensureAuthenticated, keysController.create);
  app.patch('/api/keys/:id', ensureAuthenticated, keysController.update);

  app.get('/api/is-anagram/:first/:second', anagramsController.compare);
  app.get('/api/anagrams/:phrase', anagramsController.generate);

  app.get('*', homeController.index);

  app.use(errorHandler);
};
