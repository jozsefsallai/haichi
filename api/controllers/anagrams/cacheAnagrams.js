const fs = require('fs-extra');
const path = require('path');

const CACHE_PATH = path.join(__dirname, '../../..', '.cache');

module.exports.write = function (sequence, anagrams) {
  return new Promise((resolve, reject) => {
    const json = JSON.stringify(anagrams);
    return fs.writeFile(path.join(CACHE_PATH, sequence), json, { encoding: 'utf8' } )
      .then(() => resolve(true))
      .catch(reject);
  });
};

module.exports.get = function (sequence) {
  return new Promise((resolve, reject) => {
    const cacheFile = path.join(CACHE_PATH, sequence);

    if (!fs.existsSync(cacheFile)) {
      return resolve(false);
    }

    return fs.readFile(cacheFile, { encoding: 'utf8' })
      .then(contents => JSON.parse(contents))
      .then(resolve)
      .catch(reject);
  });
};
