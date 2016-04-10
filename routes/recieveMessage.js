var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://broker.mqttdashboard.com');
var mongoose = require('mongoose');
var sendData = true;
var delay = 1800000;

var db = require('../controller/statusDB');
// var operation = mongoose.model('operation');

client.on('connect', function(){
	console.log('mqtt connected from nodejs');
	client.subscribe('plantbuddy/soil', function(){
		console.log('subscribe sucess');
		// console.log(db);
	});
})

function timer(){
	sendData = true;
}


client.on('message', function(topic, message){
	console.log(message.toString());
		if (sendData){
			sendData = false;
			if (parseInt(message.toString())>80) {
				var date = new Date();
				var saveData = new db({process: 'High', time: (date.toISOString())});
				saveData.save(function(err){
					if (err){
						return err;
					}else{
						console.log("add success");
						setTimeout(timer, delay);
					}
				})
				// db.find({}, function(data){
				// 	console.log(data);
				// });
			}else if (parseInt(message.toString())<30) {
				var date = new Date();
				var saveData = new db({process: 'Low', time: (date.toISOString())});
				saveData.save(function(err){
					if (err){
						return err;
					}else{
						console.log("add success");
						setTimeout(timer, 10000)
					}
				})
				// db.find({}, function(data){
				// 	console.log(data);
				// });
			};
		}else{
			console.log("function is delay!!")
		}
})