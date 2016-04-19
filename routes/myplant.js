var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = require('../controller/settingDB');

/* GET users listing. */
router.get('/', function(req, res, next) {
	db.find({}, function(err,data){
		// console.log(data[4].max);
		res.render('myplant', {amountofWater:data[0].max, moisMax:data[1].max, moisMin:data[1].min, tempMax:data[2].max, tempMin:data[2].min,
					luxMax:data[3].max, luxMin:data[3].min, name:data[4].max, location:data[5].max});
	});
});

module.exports = router;
