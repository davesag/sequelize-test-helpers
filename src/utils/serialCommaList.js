const oxford = words => `${words.slice(0, -1).join(', ')}, and ${words[words.length - 1]}`

/**
 * Returns a formatted list of words, separated by commas
 * as per the Oxford (aka serial) Comma rules.
 *
 * https://en.wikipedia.org/wiki/Serial_comma
 *
 * @param {array} words The array of words
 * @returns {string} A list of words with an Oxford comma as appropriate
 */
const serialCommaList = words =>
  Array.isArray(words) && words.length
    ? words.length === 1
      ? words[0]
      : words.length === 2
      ? `${words[0]} and ${words[1]}`
      : oxford(words)
    : words

module.exports = serialCommaList
