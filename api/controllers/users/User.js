const db = require('../../services/db');

const User = db.define('user', {
  username: {
    type: db.Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      len: [1, 35]
    }
  },
  name: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: db.Sequelize.STRING,
    allowNull: false
  }
});

User.prototype.toJSON = function () {
  return (async () => {
    const json = {
      id: this.get('id'),
      name: this.get('name'),
      username: this.get('username')
    };
    return json;
  })();
};

module.exports = User;
