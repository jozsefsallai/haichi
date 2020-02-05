const db = require('../../services/db');
const User = require('../users/User');

const Key = db.define('apikey', {
  apikey: {
    type: db.Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  requests: {
    type: db.Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0
  }
}, {
  tableName: 'apikeys',
  freezeTableName: true,
  name: {
    singular: 'apiKey'
  }
});

Key.prototype.toJSON = function () {
  return (async () => {
    const {
      id,
      apikey,
      requests,
      userId,
      createdAt,
      updatedAt
    } = this.get();

    const json = {
      id,
      apikey,
      requests,
      userId,
      createdAt: createdAt && createdAt.toUTCString(),
      updatedAt: updatedAt && updatedAt.toUTCString()
    };

    return json;
  })();
};

Key.belongsTo(User);
User.hasOne(Key);

module.exports = Key;
