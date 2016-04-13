var mongoose = require('mongoose');


// var data = mongoose.model('supasit', {address: String});

var schema = new mongoose.Schema({sensorName : String,
								 max : String,
								 min : String});
var Tank = mongoose.model('setting', schema);

module.exports = Tank;