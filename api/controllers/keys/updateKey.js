const Key = require('./Key');
const { APIError } = require('../../core/errors');
const uid = require('uid-safe');

class KeyUpdateError extends APIError {
  constructor(statusCode, code, data = {}) {
    super(code, data);
    this.name = 'KeyUpdateError';
    this.statusCode = statusCode;
  }
}

module.exports = async function updateKey(user, id) {
  const entry = await Key.findOne({ where: { id, userId: user.id } });

  if (!entry) {
    throw new KeyUpdateError(404, 'KEY_NOT_FOUND');
  }

  let apikey;

  do {
    apikey = await uid(48);
  } while (await Key.count({ where: { apikey } }));

  entry.apikey = apikey;
  entry.save();

  return entry.toJSON();
};
