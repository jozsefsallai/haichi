const fs = require('fs');

class Dictionary {
  constructor(location) {
    this.words = this.init(location);
  }

  init(location) {
    const raw = fs.readFileSync(location, { encoding: 'utf8' });
    return raw.split(/\r?\n/);
  }
}

module.exports.Dictionary = Dictionary;
