var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = require('../controller/settingDB');

/* GET home page. */
router.get('/', function(req, res, next) {
	db.find({sensorName:"plantName"}, function(err,data){
		console.log(data[0].max);
		res.render('status', {name : data[0].max});
	});
});

module.exports = router;