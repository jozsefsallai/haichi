module.exports = {
  up: function (q, Sequelize) {
    return q.createTable('apikeys', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      apikey: {
        type: Sequelize.STRING,
        allowNull: false
      },
      requests: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      }
    });
  },
  down: function (q, Sequelize) {
    return q.dropTable('apikeys');
  }
};
