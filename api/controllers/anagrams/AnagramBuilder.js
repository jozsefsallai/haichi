const dictionary = require('../../services/dictionary');
const { clean, count } = require('../../lib/Dictionary');

// WIP. Kind of inefficient and broken right now.

class Anagram {
  constructor(input, limit) {
    this.input = input;
    this.limit = limit;
    this.cleanInput = clean(input);
    this.inputCounter = count(this.cleanInput);
    this.baseStack = this.buildBaseStack();
    this.anagrams = [];
  }

  isWordOk(inputCounter, targetCounter) {
    for (const letter in targetCounter) {
      if (!inputCounter[letter]) {
        return false;
      }

      if (inputCounter[letter] < targetCounter[letter]) {
        return false;
      }
    }

    return true;
  }

  buildBaseStack() {
    const baseStack = [];

    for (let i = dictionary.lengthStartIndices[this.cleanInput.length]; i < dictionary.words.length; i++) {
      const entry = dictionary.words[i];

      if (this.isWordOk(this.inputCounter, entry.counter)) {
        baseStack.push(entry);
      }
    }

    return baseStack;
  }

  filterWords(base, entries) {
    return entries.filter(entry => entry.word.length <= base.length && entry.word !== base);
  }

  recurse(baseIdx, words, stack = []) {
    // TODO:

    const base = this.baseStack[baseIdx];

    if (!base || this.anagrams.length === this.limit) {
      return;
    }

    const str = [base.word, ...stack].join(' ');
    const cleanStr = clean(str);
    if (cleanStr === this.cleanInput && !this.anagrams.includes(str)) {
      this.anagrams.push(str);
    }

    if (cleanStr.length < this.cleanInput.length) {
      stack.push(base.word);
    }

    this.recurse(baseIdx + 1, this.filterWords(base.word, words), stack);
    stack.pop();
  }

  buildAnagrams() {
    if (!this.baseStack.length) {
      return;
    }

    this.baseStack.some((entry, idx) => {
      if (this.anagrams.length >= this.limit) {
        return true;
      }

      this.recurse(idx, this.filterWords(entry.word, this.baseStack));
    });
  }
}

module.exports = Anagram;
