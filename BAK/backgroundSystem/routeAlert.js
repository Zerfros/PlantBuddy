var alertMoisture = require('./javascripts/alertData/alertMoisture');

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('myplant');
});

module.exports = router;
