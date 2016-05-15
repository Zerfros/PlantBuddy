var mqtt    = require('mqtt');
var client = mqtt.connect('mqtt://broker.mqttdashboard.com');
var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
  	client.publish('plantbuddy/water', req.body.amountofWater);
  	res.redirect('/');
});

module.exports = router;