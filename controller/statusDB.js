var mongoose = require('mongoose');
var data = mongoose.model('test',{name: String});

module.exports = data;