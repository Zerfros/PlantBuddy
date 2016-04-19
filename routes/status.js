var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = require('../controller/settingDB');

/* GET home page. */
router.get('/', function(req, res, next) {
	db.find({sensorName:"plantName"}, function(err,data){
		var plantName = data[0].max;
		console.log(data[0].max);
		db.find({sensorName:"location"}, function(err,locationData){
			var location = locationData[0].max;
			res.render('status', {plantName : plantName, location: location});
		})
	});
});

module.exports = router;