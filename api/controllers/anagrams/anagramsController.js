module.exports.compare = function (req, res) {
  const { first, second } = req.params;
  const clean = str => str.toLowerCase().replace(/[^A-Za-z0-9]/, '').split('').sort().join('');

  return res.json({
    ok: true,
    isAnagram: clean(first) === clean(second)
  });
};

// WIP
module.exports.generate = function (req, res) {
  const { phrase } = req.params;
  return res.json({
    ok: true,
    anagrams: [ phrase ]
  });
};
