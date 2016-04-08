var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://broker.mqttdashboard.com');
var mongoose = require('mongoose');

var db = require('../controller/statusDB');
// var operation = mongoose.model('operation');

client.on('connect', function(){
	console.log('mqtt connected from nodejs');
	client.subscribe('plantbuddy/soil', function(){
		console.log('subscribe sucess');
		// console.log(db);
	});
})


client.on('message', function(topic, message){
	console.log(message.toString());
	if (parseInt(message.toString())>80) {
		var saveData = new db({process: 'High', time: (new Date())});
		saveData.save(function(err){
			if (err){
				return err;
			}else{
				console.log("add success");
			}
		})
		// db.find({}, function(data){
		// 	console.log(data);
		// });
	}else if (parseInt(message.toString())<30) {
		var saveData = new db({process: 'Low', time: (new Date())});
		saveData.save(function(err){
			if (err){
				return err;
			}else{
				console.log("add success");
			}
		})
		// db.find({}, function(data){
		// 	console.log(data);
		// });
	};
})