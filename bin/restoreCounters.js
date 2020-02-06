const Key = require('../api/controllers/keys/Key');
const db = require('../api/services/db');
const { Op } = require('sequelize');

Key.findAll({ where: { requests: { [Op.not]: 0 } } })
  .then(async keys => {
    console.log(`Used keys: ${keys.length}.`);

    for (const key of keys) {
      console.log(`Restoring counters for ${key.apikey}...`);
      key.requests = 0;
      await key.save();
    }

    db.close();
    console.log('Done!');
  })
  .catch(console.error);
