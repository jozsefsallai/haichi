const Key = require('./Key');
const createKey = require('./createKey');
const updateKey = require('./updateKey');

module.exports.get = function (req, res, next) {
  const { user } = req;
  return Key.findOne({ where: { userId: user.id } })
    .then(record => {
      if (!record) {
        return res.json({
          ok: true,
          key: null
        });
      }

      return record.toJSON()
        .then(json => res.json({
          ok: true,
          key: json
        }));
    })
    .catch(next);
};

module.exports.create = function (req, res, next) {
  const { user } = req;
  createKey(user)
    .then(key => res.json({
      ok: true,
      key
    }))
    .catch(err => {
      if (err.code === 'KeyCreationError') {
        return res.status(err.statusCode).json({
          ok: false,
          errors: [ err.toJSON() ]
        });
      }

      return next(err);
    });
};

module.exports.update = function (req, res, next) {
  const { id } = req.params;

  updateKey(req.user, id)
    .then(key => res.json({
      ok: true,
      key
    }))
    .catch(err => {
      if (err.code === 'KeyUpdateError') {
        return res.status(err.statusCode).json({
          ok: false,
          errors: [ err.toJSON() ]
        });
      }

      return next(err);
    });
};
