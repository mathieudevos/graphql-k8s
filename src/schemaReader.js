const { readFileSync } = require('fs');

function readSchema(filePath) {
  return readFileSync(`../schemas/${filePath}`, 'utf8');
}

module.exports = { readSchema };
