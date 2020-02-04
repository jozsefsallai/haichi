const auth = require('../../services/auth');

module.exports.create = function (req, res, next) {
  auth.authenticate((err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(400).json({
        ok: false,
        errors: [{ code: 'WRONG_USER_OR_PASSWORD' }]
      });
    }

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }

      return user.toJSON()
        .then((json) => {
          return res.json({
            ok: true,
            user: json
          });
        }).catch(next);
    });
  })(req, res, next);
};

module.exports.destroy = function (req, res) {
  req.logout();

  if (req.accepts('json')) {
    return res.json({ ok: true });
  }
  return res.redirect('/');
};
