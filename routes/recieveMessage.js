var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://broker.mqttdashboard.com');
var mongoose = require('mongoose');
var sendTemperature = true;
var sendMoisture = true;
var delay = 1800000;

var db = require('../controller/notificationDB');
// var operation = mongoose.model('operation');

client.on('connect', function(){
	console.log('mqtt connected from nodejs');
	client.subscribe('plantbuddy/moisture', function(){
		console.log('subscribe moisture success');
		// console.log(db);
	});
	client.subscribe('plantbuddy/temperature', function(){
		console.log('subscribe temperature success');
		// console.log(db);
	});
	client.subscribe('plantbuddy/systemNotify', function(){
		console.log('subscribe systemNotify success');
		// console.log(db);
	});
})

function timerMoisture(){
	sendMoisture = true;
}

function timerTemperature(){
	sendTemperature = true;
}


client.on('message', function(topic, message){
	console.log(topic.toString()+" "+message.toString());
		if (topic.toString() == "plantbuddy/moisture") {
			if (sendMoisture){
				if (parseInt(message.toString())>80) {
					var date = new Date();
					var saveData = new db({process: 'High moisture', time: (date.toISOString())});
					saveData.save(function(err){
						if (err){
							return err;
						}else{
							console.log("add success");
							setTimeout(timerMoisture, delay);
						}
					})
					// db.find({}, function(data){
					// 	console.log(data);
					// });
				}else if (parseInt(message.toString())<20) {
					var date = new Date();
					var saveData = new db({process: 'Low moisture', time: (date.toISOString())});
					saveData.save(function(err){
						if (err){
							return err;
						}else{
							console.log("add success");
							setTimeout(timerMoisture, delay)
						}
					})
					// db.find({}, function(data){
					// 	console.log(data);
					// });
				};
				sendMoisture = false;
			}else{
				console.log("function is delay!!")
			}
		}else if (topic.toString() == "plantbuddy/temperature"){
			if (sendTemperature){
				sendTemperature = false;
				if (parseInt(message.toString())>80) {
					var date = new Date();
					var saveData = new db({process: 'High temperature', time: (date.toISOString())});
					saveData.save(function(err){
						if (err){
							return err;
						}else{
							console.log("add success");
							setTimeout(timerTemperature, delay);
						}
					})
					// db.find({}, function(data){
					// 	console.log(data);
					// });
				}else if (parseInt(message.toString())<20) {
					var date = new Date();
					var saveData = new db({process: 'Low temperature', time: (date.toISOString())});
					saveData.save(function(err){
						if (err){
							return err;
						}else{
							console.log("add success");
							setTimeout(timerTemperature, delay)
						}
					})
					// db.find({}, function(data){
					// 	console.log(data);
					// });
				};
			}else{
				console.log("function is delay!!")
			}
		}else if (topic.toString() == "plantbuddy/systemNotify"){
			if (message.toString() == "Watered") {
				var date = new Date();
				var saveData = new db({process: 'Watered', time: (date.toISOString())});
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
			}else if (message.toString() == "LED") {
				var date = new Date();
				var saveData = new db({process: 'Turn ON : LED grow light', time: (date.toISOString())});
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
		}else{
			
		}
})