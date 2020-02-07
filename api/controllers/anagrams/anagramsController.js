const dictionary = require('../../services/dictionary');
const { clean } = require('../../lib/Dictionary');
const config = require('../../config');
const Key = require('../keys/Key');

function isValidAPIKey(apikey) {
  return new Promise((resolve, reject) => {
    return Key.findOne({ where: { apikey } })
      .then(key => {
        if (!key) {
          return resolve(false);
        }

        key.requests++;
        key.save();
        return resolve(true);
      })
      .catch(reject);
  });
}

module.exports.compare = function (req, res) {
  const { first, second } = req.params;

  return res.json({
    ok: true,
    isAnagram: clean(first) === clean(second)
  });
};

// WIP
module.exports.generate = async function (req, res) {
  const limitResults = !req.user && !req.token;

  if (req.token) {
    try {
      const keyCheck = await isValidAPIKey(req.token);

      if (!keyCheck) {
        return res.status(403).json({
          ok: false,
          error: 'The provided API key is invalid.'
        });
      }
    } catch (err) {
      return res.status(500).json({ ok: false });
    }
  }

  const { phrase } = req.params;
  const cleanOriginal = clean(phrase);
  const anagrams = [];

  const fromIdx = dictionary.lengthStartIndices[cleanOriginal.length];
  const toIdx = dictionary.lengthStartIndices[cleanOriginal.length - 1];

  for (let i = fromIdx; i < toIdx; i++) {
    const entry = dictionary.words[i];

    if (entry.sequence !== cleanOriginal) {
      continue;
    }

    if (entry.word.length !== cleanOriginal.length) {
      break;
    }

    if (limitResults && anagrams.length === config.app.dictionary.maxUnauthorizedResults) {
      break;
    }

    anagrams.push(entry.word);
  }

  return res.json({
    ok: true,
    anagrams
  });
};
