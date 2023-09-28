function trim(string, max) {
  return string.length > max ? string.slice(0, max) : string;
}

module.exports = trim;