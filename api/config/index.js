const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'default';
const defaultConfig = {};
const envConfig = {};

const defaultKeys = fs.readdirSync(path.resolve(__dirname, 'default'));
defaultKeys.map(f => path.basename(f, '.json')).forEach(function (key) {
  defaultConfig[key] = require(`./default/${key}.json`);
});

if (!fs.existsSync(path.resolve(__dirname, env))) {
  throw new Error(`Unknown NODE_ENV=${env}`);
}

if (env !== 'default') {
  const envKeys = fs.readdirSync(path.resolve(__dirname, env));
  envKeys.map(f => path.basename(f, '.json')).forEach(function (key) {
    envConfig[key] = require(`./${env}/${key}.json`);
  });
}

function deepassign(dest, src) {
  Object.keys(src).forEach(function (key) {
    if (typeof dest[key] === 'object' && dest[key] !== null) {
      return deepassign(dest[key], src[key]);
    }
    dest[key] = src[key];
  });
}
deepassign(defaultConfig, envConfig);

if (env === 'production') {
  const secretsConfigFilename = '/var/secrets/haichi.json';
  if (!fs.existsSync(secretsConfigFilename)) {
    throw new Error('Failed to start app, secrets config file not found');
  }
  const secretsConfig = require(secretsConfigFilename);
  deepassign(defaultConfig, secretsConfig);
}

module.exports = defaultConfig;
