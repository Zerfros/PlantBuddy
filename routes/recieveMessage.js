var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://broker.mqttdashboard.com');
var mongoose = require('mongoose');
var sendTemperature = true;
var sendMoisture = true;
var delay = 1800000;

var notificationDB = require('../controller/notificationDB');
var settingDB = require('../controller/settingDB');
// var operation = mongoose.model('operation');

client.on('connect', function(){
	console.log('mqtt connected from nodejs');
	client.subscribe('plantbuddy/moisture', function(){
		console.log('subscribe moisture success');
		// console.log(notificationDB);
	});
	client.subscribe('plantbuddy/temperature', function(){
		console.log('subscribe temperature success');
		// console.log(notificationDB);
	});
	client.subscribe('plantbuddy/systemNotify', function(){
		console.log('subscribe systemNotify success');
		// console.log(notificationDB);
	});
})

function timerMoisture(){
	sendMoisture = true;
}

function timerTemperature(){
	sendTemperature = true;
}

function timerLux(){
	sendLux = true;
}

client.on('message', function(topic, message){
	settingDB.find({}, function(err,data){
		console.log(topic.toString()+" "+message.toString());
		if (topic.toString() == "plantbuddy/moisture") {
			if (sendMoisture){
				if (parseInt(message.toString())>parseInt(data[1].max)) {
					var date = new Date();
					var saveData = new notificationDB({process: 'High moisture', time: (date.toISOString())});
					saveData.save(function(err){
						if (err){
							return err;
						}else{
							console.log("add success");
							setTimeout(timerMoisture, delay);
						}
					})
					sendMoisture = false;
					// notificationDB.find({}, function(data){
					// 	console.log(data);
					// });
				}else if (parseInt(message.toString())<parseInt(data[1].min)) {
					var date = new Date();
					var saveData = new notificationDB({process: 'Low moisture', time: (date.toISOString())});
					saveData.save(function(err){
						if (err){
							return err;
						}else{
							console.log("add success");
							setTimeout(timerMoisture, delay)
						}
					})
					sendMoisture = false;
					// notificationDB.find({}, function(data){
					// 	console.log(data);
					// });
				};
			}else{
				console.log("function is delay!!")
			}
		}else if (topic.toString() == "plantbuddy/temperature"){
			if (sendTemperature){
				
				if (parseInt(message.toString())>parseInt(data[2].max)) {
					var date = new Date();
					var saveData = new notificationDB({process: 'High temperature', time: (date.toISOString())});
					saveData.save(function(err){
						if (err){
							return err;
						}else{
							console.log("add success");
							setTimeout(timerTemperature, delay);
						}
					})
					sendTemperature = false;
					// notificationDB.find({}, function(data){
					// 	console.log(data);
					// });
				}else if (parseInt(message.toString())<parseInt(data[2].min)) {
					var date = new Date();
					var saveData = new notificationDB({process: 'Low temperature', time: (date.toISOString())});
					saveData.save(function(err){
						if (err){
							return err;
						}else{
							console.log("add success");
							setTimeout(timerTemperature, delay)
						}
					})
					sendTemperature = false;
					// notificationDB.find({}, function(data){
					// 	console.log(data);
					// });
				};
			}else{
				console.log("function is delay!!")
			}
		}else if (topic.toString() == "plantbuddy/lux") {
			if (sendLux){
				if (parseInt(message.toString())>parseInt(data[3].max)) {
					var date = new Date();
					var saveData = new notificationDB({process: 'High Lux', time: (date.toISOString())});
					saveData.save(function(err){
						if (err){
							return err;
						}else{
							console.log("add success");
							setTimeout(timerLux, delay);
						}
					})
					sendMoisture = false;
					// notificationDB.find({}, function(data){
					// 	console.log(data);
					// });
				}else if (parseInt(message.toString())<parseInt(data[3].min)) {
					var date = new Date();
					var saveData = new notificationDB({process: 'Low Lux', time: (date.toISOString())});
					saveData.save(function(err){
						if (err){
							return err;
						}else{
							console.log("add success");
							setTimeout(timerLux, delay)
						}
					})
					// notificationDB.find({}, function(data){
					// 	console.log(data);
					// });
					sendMoisture = false;
				};
				
			}else{
				console.log("function is delay!!")
			}
		}else if (topic.toString() == "plantbuddy/systemNotify"){
			if (message.toString() == "Watered") {
				var date = new Date();
				var saveData = new notificationDB({process: 'Watered', time: (date.toISOString())});
				saveData.save(function(err){
					if (err){
						return err;
					}else{
							console.log("add success");
					}
				})
				// notificationDB.find({}, function(data){
				// 	console.log(data);
				// });
			}else if (message.toString() == "LED") {
				var date = new Date();
				var saveData = new notificationDB({process: 'Turn ON : LED grow light', time: (date.toISOString())});
				saveData.save(function(err){
					if (err){
						return err;
					}else{
							console.log("add success");
					}
				})
				// notificationDB.find({}, function(data){
				// 	console.log(data);
				// });
			};
		}else{}
	})
})