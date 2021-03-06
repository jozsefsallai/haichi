const { createUser } = require('./createUser');
const { updateUser } = require('./updateUser');

module.exports.get = function (req, res, next) {
  return req.user
    .toJSON()
    .then(user => res.json(user))
    .catch(next);
};

module.exports.create = function (req, res, next) {
  const {
    username,
    name,
    password,
    password2
  } = req.body;

  return createUser({ username, name, password, password2 })
    .then(function (user) {
      req.login(user, function (err) {
        if (err) {
          return next(err);
        }

        return user
          .toJSON()
          .then(json => res.json({ ok: true, user: json }))
          .catch(next);
      });
    })
    .catch(function (err) {
      if (err.name === 'UserCreationError') {
        return res.status(422).json({
          ok: false,
          errors: [ err.toJSON() ]
        });
      }

      return next(err);
    });
};

module.exports.update = function (req, res, next) {
  return updateUser({
    user: req.user,
    attributes: req.body
  })
    .then(user => user.toJSON())
    .then(user => res.json({ ok: true, user }))
    .catch(err => {
      if (err.name === 'UserUpdateError') {
        return res.status(422).json({
          ok: false,
          errors: [ err.toJSON() ]
        });
      }

      return next(err);
    });
};
