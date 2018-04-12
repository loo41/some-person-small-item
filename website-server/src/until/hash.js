const fnv = require('fnv-plus');

exports.createHash = (str) => {
  const data = fnv.hash(str, 64)
  return data.hex()
}