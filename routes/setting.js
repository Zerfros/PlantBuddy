var mqtt    = require('mqtt');
var client = mqtt.connect('mqtt://broker.mqttdashboard.com');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = require('../controller/settingDB');

/* GET users listing. */
router.post('/', function(req, res) {
  console.log(req.body);
  db.update({ sensorName: "plantName" },
 			{ max: req.body.plantName},
 			{ upsert: true }, function(err,data){});
  db.update({ sensorName: "amountofWater" },
 			{ max: req.body.amountofWater},
 			{ upsert: true }, function(err,data){});
  db.update({ sensorName: "moistureSensor" },
 			{ max: req.body.moisMax,
 			  min: req.body.moisMin},
 			{ upsert: true }, function(err,data){});
  // db.update({ sensorName: "temperatureSensor" },
  // 		{ max: req.body.tempMax,
 	// 		  min: req.body.tempMin},
 	// 		{ upsert: true }, function(err,data){});
  db.update({ sensorName: "luxSensor" },
 			{ max: req.body.luxMax,
 			  min: req.body.luxMin},
 			{ upsert: true }, function(err,data){});
  db.update({ sensorName: "location" },
      { max: req.body.locations},
      { upsert: true }, function(err,data){});
  console.log(req.body);
  console.log("Save setting");
  // $.ajax({
  //     alert("Done");
  // });
  //alert("sometext");
  client.publish('plantbuddy/water', req.body.amountofWater);
  client.publish('plantbuddy/lowMoisture', req.body.moisMin);
  client.publish('plantbuddy/lowLux', req.body.luxMin);
  res.redirect('/myplant');
});

module.exports = router;
