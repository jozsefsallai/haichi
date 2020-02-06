const config = require('../config');
const fs = require('fs');
const path = require('path');

const { Dictionary } = require('../lib/Dictionary');

const location = path.join(__dirname, '../..', config.app.dictionary.path);

if (!fs.existsSync(location)) {
  throw new Error(`Failed to load the dictionary. The dictionary file could not be found: ${location}`);
}

module.exports = new Dictionary(location);
