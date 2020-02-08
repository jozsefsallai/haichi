const fs = require('fs');

const clean = str => str.toLowerCase().replace(/[^a-z]/, '').split('').sort().join('');
const count = sequence => {
  const counter = {};

  sequence.split('').forEach(letter => {
    if (!counter[letter]) {
      counter[letter] = 1;
      return;
    }

    counter[letter]++;
  });

  return counter;
};

/**
 * @api
 */
class Dictionary {
  constructor(location) {
    console.log('Loading dictionary... this might take a while.');

    // Get raw array of words.
    this.rawWords = this.init(location);

    // Sort words by length in descending order and then alphabetically
    // then turn the items into word objects.
    this.words = this.rawWords
      .sort((a, b) => b.length - a.length || a.localeCompare(b))
      .map(this.createWordObject);

    // Generate array of length start indices (see the method for more)
    // information.
    this.lengthStartIndices = this.getLengthStartIndices();

    console.log('Loaded dictionary and length start indices.');
  }

  /**
   * createWordObject()
   * Turns a word into a word object. A word object is an object
   * that contains 3 properties: the word itself, the sequence it
   * has, and the count of each distinct letter. For example, if
   * we pass the string "anagram" to it, the response will be
   * { word: "anagram", sequence: "aaagmnr", counter: { ... } }
   * @param {string} word - the word to convert to a word object
   * @returns {object}
   */
  createWordObject(word) {
    const sequence = clean(word);
    const counter = count(sequence);

    return {
      word,
      sequence,
      counter
    };
  }

  /**
   * getLengthStartIndices()
   * Creates an array of indices where words with a given length
   * start. Since the dictionary array is sorted, this increases
   * performance during runtime, since we can iterate only from
   * a given length index instead of iterating throught the whole
   * array.
   */
  getLengthStartIndices() {
    const indices = [];

    for (let i = 0; i < this.words.length; i++) {
      const currentLenght = this.words[i].word.length;

      if (!indices[currentLenght]) {
        indices[currentLenght] = i;
      }
    }

    return indices;
  }

  /**
   * Returns a raw array of words from a plaintext file.
   * @param {string} location - the location of the dictionary
   */
  init(location) {
    const raw = fs.readFileSync(location, { encoding: 'utf8' });
    return raw.split(/\r?\n/).filter(word => {
      return word.length > 1 || (word.length === 1 && ['a', 'i'].includes(word));
    });
  }
}

module.exports.Dictionary = Dictionary;
module.exports.clean = clean;
module.exports.count = count;
