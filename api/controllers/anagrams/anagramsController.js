const { performance } = require('perf_hooks');
const cache = require('./cacheAnagrams');

const { clean } = require('../../lib/Dictionary');
const config = require('../../config');
const Key = require('../keys/Key');

const Anagram = require('./AnagramBuilder');

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
  const cleanPhrase = clean(phrase);

  const limit = limitResults
    ? config.app.dictionary.maxUnauthorizedResults
    : config.app.dictionary.maxResults;

  try {
    const anagrams = await cache.get(cleanPhrase);

    if (anagrams) {
      return res.json({
        ok: true,
        anagrams: anagrams.slice(0, limit)
      });
    }
  } catch (err) {
    return res.status(500).json({ ok: false });
  }

  const builder = new Anagram(cleanPhrase, limit);

  const start = performance.now();
  builder.buildAnagrams();
  const end = performance.now();

  if (Math.floor((end - start) / 1000) > config.app.cache.anagramCache && !limitResults) {
    await cache.write(cleanPhrase, builder.anagrams);
  }

  return res.json({
    ok: true,
    anagrams: builder.anagrams
  });
};
