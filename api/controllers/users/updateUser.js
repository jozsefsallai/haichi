const passwords = require('./passwords');
const { APIError } = require('../../core/errors');
const difference = require('lodash.difference');

class UserUpdateError extends APIError {
  constructor(code, data = {}) {
    super(code, data);
    this.name = 'UserUpdateError';
  }
}

function verifyPassword(user, password) {
  if (!password) {
    return Promise.resolve();
  }

  return passwords.verify(password, user.password);
}

module.exports.updateAttribute = function updateAttribute(user, key, value, opts = {}) {
  return new Promise((resolve, reject) => {
    if (key === 'password2') {
      return resolve(user);
    }

    if (key === 'password') {
      if (!opts.verifiedCurrentPassword) {
        throw new UserUpdateError('WRONG_PASSWORD');
      }

      if (!value) {
        throw new UserUpdateError('PASSWORD_NOT_PROVIDED');
      }

      return passwords.hash(value)
        .then(hash => {
          user[key] = hash;
          return resolve(user);
        })
        .catch(reject);
    }

    if (!value) {
      throw new UserUpdateError('MUST_PROVIDE_ALL_VALUES');
    }

    user[key] = value;
    return resolve(user);
  });
};

module.exports.updateUser = function updateUser({ user, attributes = {} }) {
  return new Promise((resolve, reject) => {
    const attributeKeys = Object.keys(attributes);

    if (attributeKeys.length < 1) {
      return reject(new UserUpdateError('MISSING_ATTRIBUTES'));
    }

    const allowedAttributes = [
      'username',
      'name',
      'password',
      'password2',
      'currentPassword'
    ];

    const forbiddenAttributes = difference(attributeKeys, allowedAttributes);
    if (forbiddenAttributes.length) {
      return reject(new UserUpdateError('FORBIDDEN_ATTRIBUTES', { fields: forbiddenAttributes }));
    }

    if (attributes.password && attributes.password2) {
      if (attributes.password !== attributes.password2) {
        return reject(new UserUpdateError('PASSWORDS_DONT_MATCH'));
      }
    }

    return verifyPassword(user, attributes.currentPassword)
      .then(function (verifiedCurrentPassword) {
        return Promise.all(attributeKeys.map(key => {
          return exports.updateAttribute(user, key, attributes[key], { verifiedCurrentPassword });
        }));
      })
      .then(() => user.save())
      .then(() => resolve(user))
      .catch(reject);
  });
};
