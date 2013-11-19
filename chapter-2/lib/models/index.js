var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name         : { type: String, required: true, index: true }
  , token        : { type: String }
  , user         : { type: String, required: true, index: true }
  , created      : { type: Date, default: Date.now }
  , repositories : [ { type: String } ]
});

mongoose.model('Project', ProjectSchema);
module.exports = mongoose;