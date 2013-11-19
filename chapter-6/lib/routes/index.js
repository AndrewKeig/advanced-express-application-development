var ignore = /.DS_Store$/;
var requireDirectory = require('require-directory');
module.exports = requireDirectory(module, __dirname, ignore);