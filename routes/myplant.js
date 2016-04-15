var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = require('../controller/settingDB');

/* GET users listing. */
router.get('/', function(req, res, next) {
  	res.render('myplant');
});

module.exports = router;
