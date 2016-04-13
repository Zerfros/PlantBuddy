var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = require('../controller/settingDB');

/* GET users listing. */
router.get('/', function(req, res, next) {
	db.update({},{},{ sort: { '_id' : -1 } }, function(err,data){
		// console.log('Data = '+data);
		while (i < data.length){
			subNotification.push(data[i].process);
			subNotification.push(data[i].time);
			notification.push(subNotification);
			// console.log('sub = '+subNotification);
			// console.log('no = '+notification);
			i++;
			subNotification = [];
		}
		// console.log(notification);

		res.render('notification', {notification : notification});
	});
	notification = [];
	i = 0;
  	// res.render('myplant');
});

module.exports = router;
