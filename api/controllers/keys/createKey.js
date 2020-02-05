const Key = require('./Key');
const { APIError } = require('../../core/errors');
const uid = require('uid-safe');

class KeyCreationError extends APIError {
  constructor(statusCode, code, data = {}) {
    super(code, data);
    this.name = 'KeyCreationError';
    this.statusCode = statusCode;
  }
}

module.exports = async function createKey(user) {
  const entry = await Key.findOne({ where: { userId: user.id } });

  if (entry) {
    throw new KeyCreationError(422, 'KEY_ALREADY_EXISTS');
  }

  let apikey;

  do {
    apikey = await uid(48);
  } while (await Key.count({ where: { apikey } }));

  const newKey = await Key.create({
    apikey,
    userId: user.id
  });

  return newKey.toJSON();
};
