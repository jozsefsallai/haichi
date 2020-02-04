const User = require('./User');
const hashPasswords = require('./passwords').hash;

class UserCreationError extends Error {
  constructor(code, data = {}) {
    super();
    this.name = 'UserCreationError';
    this.code = code;
    Object.assign(this, data);
  }

  toJSON() {
    if (this.fields) {
      return { code: this.code, fields: this.fields };
    }
    return { code: this.code };
  }
}

module.exports.createUser = function createUser(data) {
  const {
    username,
    name,
    password,
    password2
  } = data;

  return new Promise(function (resolve, reject) {
    return new Promise(function (resolve, reject) {
      if (!username) {
        return reject(new UserCreationError('MISSING_USERNAME'));
      }
      if (password !== password2) {
        return reject(new UserCreationError('PASSWORDS_DONT_MATCH'));
      }
      if (!password) {
        return reject(new UserCreationError('MISSING_PASSWORD'));
      }
      if (!name) {
        return reject(new UserCreationError('MISSING_NAME'));
      }
      return resolve();
    })
      .then(function () {
        return User.findAll({ where: { username } });
      })
      .then(function (records) {
        if (records.length > 0) {
          throw new UserCreationError('USERNAME_NOT_UNIQUE');
        }
        return hashPasswords(password);
      })
      .then(function (password) {
        return User.create({ username, password, name });
      })
      .then(function (user) {
        return resolve(user);
      })
      .catch(function (err) {
        if (err.name === 'SequelizeValidationError') {
          return reject(new UserCreationError('VALIDATION', {
            fields: err.errors.map(e => e.path)
          }));
        }
        return reject(err);
      });
  });
};
