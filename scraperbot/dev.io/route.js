const fs = require('fs');
const getTags = () => {
  var tags = fs
    .readFileSync('./tags.csv')
    .toString()
    .split(',')
    .map((t) => t.trim());
  return tags;
};

module.exports = getTags;
