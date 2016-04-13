var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

require('../controller/notificationDB');
operation = mongoose.model('operation')

/* GET home page. */
router.post('/', function(req, res) {
	var moisture = req.body.moisture;
	var times = req.body.times;
	operation.insert({'process': moisture, 'time': times}, function(err,data){
		console.log(data);
	});

});

module.exports = router;