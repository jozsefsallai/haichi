const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passwordsUtils = require('../controllers/users/passwords');
const User = require('../controllers/users/User');

passport.use(new LocalStrategy(
  function (username, password, done) {
    let user;

    User.findOne({ where: { username } })
      .then((record) => {
        user = record;

        if (!user) {
          return null;
        }
        return passwordsUtils.verify(password, user.password);
      })
      .then((success) => {
        return done(null, success ? user : false);
      })
      .catch((err) => {
        return done(err);
      });
  }
));

passport.serializeUser((user, done) => {
  return done(null, user.get('id'));
});

passport.deserializeUser((id, done) => {
  User.findOne({ where: { id: id } })
    .then((user) => {
      return done(null, user);
    })
    .catch(done);
});

module.exports.authenticate = (callback) => {
  return passport.authenticate('local', callback);
};
