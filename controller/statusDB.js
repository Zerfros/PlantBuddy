
var mongoose = require('mongoose');


// var data = mongoose.model('supasit', {address: String});

var schema = new mongoose.Schema({process : String,
								 time : String});
var Tank = mongoose.model('operation', schema);

module.exports = Tank;