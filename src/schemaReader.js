const { readFileSync } = require('fs');

function readSchema(filePath) {
  return readFileSync(`${__dirname}/../schemas/${filePath}`, 'utf8');
}

module.exports = { readSchema };
