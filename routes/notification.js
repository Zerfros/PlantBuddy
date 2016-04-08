var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = require('../controller/statusDB');
var ta = require('time-ago');  // node.js

/* GET home page. */
router.get('/', function(req, res, next) {
	db.findOne({},{},{ sort: { '_id' : -1 } }, function(err,data){
		res.render('notification', {notificationProcess :data.process, notificationTime :data.time });
		// console.log(ta.ago(data.time));
	});
});

// function timeSince(date) {

//     var seconds = Math.floor((new Date() - (date-0)) / 1000);
//     console.log('s');

//     var interval = Math.floor(seconds / 31536000);

//     if (interval > 1) {
//         return interval + " years";
//     }
//     interval = Math.floor(seconds / 2592000);
//     if (interval > 1) {
//         return interval + " months";
//     }
//     interval = Math.floor(seconds / 86400);
//     if (interval > 1) {
//         return interval + " days";
//     }
//     interval = Math.floor(seconds / 3600);
//     if (interval > 1) {
//         return interval + " hours";
//     }
//     interval = Math.floor(seconds / 60);
//     if (interval > 1) {
//         return interval + " minutes";
//     }
//     return Math.floor(seconds) + " seconds";
// }

module.exports = router;

