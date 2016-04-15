var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = require('../controller/settingDB');
var alert = require('alerts');


/* GET users listing. */
router.post('/', function(req, res) {
    console.log(req.body);
    db.update({ sensorName: "plantName" },
   			{ max: req.body.name},
   			{ upsert: true }, function(err,data){});
    db.update({ sensorName: "amountofWater" },
   			{ max: req.body.amountofWater},
   			{ upsert: true }, function(err,data){});
    db.update({ sensorName: "moistureSensor" },
   			{ max: req.body.moisMax,
   			  min: req.body.moisMin},
   			{ upsert: true }, function(err,data){});
    db.update({ sensorName: "temperatureSensor" },
    		{ max: req.body.tempMax,
   			  min: req.body.tempMin},
   			{ upsert: true }, function(err,data){});
    db.update({ sensorName: "luxSensor" },
   			{ max: req.body.luxMax,
   			  min: req.body.luxMin},
   			{ upsert: true }, function(err,data){});
    console.log("Save setting");
	alert('Foo');
    //alert("sometext");
    res.redirect('/myplant');
});

module.exports = router;
