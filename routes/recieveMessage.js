var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://broker.mqttdashboard.com');
var mongoose = require('mongoose');
// var sendTemperature = true;
var sendHighMoisture = true;
var sendLowMoisture = true;
var sendHighBrightness = true;
var sendLowBrightness = true;
var delay = 1800000;
var ledOn = true;
var ledOff = true;

var notificationDB = require('../controller/notificationDB');
var settingDB = require('../controller/settingDB');
// var operation = mongoose.model('operation');

client.on('connect', function(){
	console.log('mqtt connected from nodejs');
	client.subscribe('plantbuddy/moisture', function(){
		console.log('subscribe moisture success');
		// console.log(notificationDB);
	});
	// client.subscribe('plantbuddy/temperature', function(){
	// 	console.log('subscribe temperature success');
	// 	// console.log(notificationDB);
	// });
	client.subscribe('plantbuddy/systemNotify', function(){
		console.log('subscribe systemNotify success');
		// console.log(notificationDB);
	});
	client.subscribe('plantbuddy/brightness', function(){
		console.log('subscribe brightness success');
		// console.log(notificationDB);
	});
})

function timerHighMoisture(){
	sendHighMoisture = true;
}
function timerLowMoisture(){
	sendLowMoisture = true;
}

// function timerTemperature(){
// 	sendTemperature = true;
// }

function timerHighBrightness(){
	sendHighBrightness = true;
}
function timerLowBrightness(){
	sendLowBrightness = true;
}

client.on('message', function(topic, message){
	settingDB.find({}, function(err,data){
		console.log(topic.toString()+" "+message.toString());
		if (topic.toString() == "plantbuddy/moisture") {
			if (parseInt(message.toString())>parseInt(data[1].max)) {
				if (sendHighMoisture){
					var date = new Date();
					var saveData = new notificationDB({process: 'High moisture', time: (date.toISOString())});
					saveData.save(function(err){
						if (err){
							return err;
						}else{
							console.log("Added High moisture");
							setTimeout(timerHighMoisture, delay);
						}
					})
					sendHighMoisture = false;
					// notificationDB.find({}, function(data){
					// 	console.log(data);
					// });
				}else{
					console.log("Function is delay!!")
				}
			}else if (parseInt(message.toString())<parseInt(data[1].min)) {
				if(sendLowMoisture){
					var date = new Date();
					var saveData = new notificationDB({process: 'Low moisture', time: (date.toISOString())});
					saveData.save(function(err){
						if (err){
							return err;
						}else{
							console.log("Added Low moisture");
							setTimeout(timerLowMoisture, delay)
						}
					})
					sendLowMoisture = false;
					// notificationDB.find({}, function(data){
					// 	console.log(data);
					// });
				}else{
					console.log("Function is delay!!")
				}
			}
			
		// }else if (topic.toString() == "plantbuddy/temperature"){
		// 	if (sendTemperature){
				
		// 		if (parseInt(message.toString())>parseInt(data[2].max)) {
		// 			var date = new Date();
		// 			var saveData = new notificationDB({process: 'High temperature', time: (date.toISOString())});
		// 			saveData.save(function(err){
		// 				if (err){
		// 					return err;
		// 				}else{
		// 					console.log("add success");
		// 					setTimeout(timerTemperature, delay);
		// 				}
		// 			})
		// 			sendTemperature = false;
		// 			// notificationDB.find({}, function(data){
		// 			// 	console.log(data);
		// 			// });
		// 		}else if (parseInt(message.toString())<parseInt(data[2].min)) {
		// 			var date = new Date();
		// 			var saveData = new notificationDB({process: 'Low temperature', time: (date.toISOString())});
		// 			saveData.save(function(err){
		// 				if (err){
		// 					return err;
		// 				}else{
		// 					console.log("add success");
		// 					setTimeout(timerTemperature, delay)
		// 				}
		// 			})
		// 			sendTemperature = false;
		// 			// notificationDB.find({}, function(data){
		// 			// 	console.log(data);
		// 			// });
		// 		};
		// 	}else{
		// 		console.log("function is delay!!")
		// 	}
		}else if (topic.toString() == "plantbuddy/brightness") {
			if (parseInt(message.toString())>parseInt(data[3].max)) {
				if (sendHighBrightness){
					var date = new Date();
					var saveData = new notificationDB({process: 'High Lux', time: (date.toISOString())});
					saveData.save(function(err){
						if (err){
							return err;
						}else{
							console.log("Added High Lux");
							setTimeout(timerHighBrightness, delay);
						}
					})
					sendHighBrightness = false;
				}else{
					console.log("Function is delay!!")
				}
				// notificationDB.find({}, function(data){
				// 	console.log(data);
				// });
			}else if (parseInt(message.toString())<parseInt(data[3].min)) {
				if (sendLowBrightness){
					var date = new Date();
					var saveData = new notificationDB({process: 'Low Lux', time: (date.toISOString())});
					saveData.save(function(err){
						if (err){
							return err;
						}else{
							console.log("Added Low lux");
							setTimeout(timerLowBrightness, delay)
						}
					})
					sendLowBrightness = false;
				}else{
					console.log("Function is delay!!")
				}
				// notificationDB.find({}, function(data){
				// 	console.log(data);
				// });
			};
		}else if (topic.toString() == "plantbuddy/systemNotify"){
			if (message.toString() == "Watered") {
				var date = new Date();
				var saveData = new notificationDB({process: 'Watered', time: (date.toISOString())});
				saveData.save(function(err){
					if (err){
						return err;
					}else{
							console.log("Added Watered");
					}
				})
				// notificationDB.find({}, function(data){
				// 	console.log(data);
				// });
			}else if (message.toString() == "ledON") {
				if (ledOn){
					var date = new Date();
					var saveData = new notificationDB({process: 'Turn ON : LED grow light', time: (date.toISOString())});
					saveData.save(function(err){
						if (err){
							return err;
						}else{
								console.log("Added Led On");
								ledOn = false;
								ledOff = true;
						}
					})
				}
				// notificationDB.find({}, function(data){
				// 	console.log(data);
				// });
			}else if (message.toString() == "ledOFF") {
				if (ledOff){
					var date = new Date();
					var saveData = new notificationDB({process: 'Turn OFF : LED grow light', time: (date.toISOString())});
					saveData.save(function(err){
						if (err){
							return err;
						}else{
								console.log("Added Led Off");
								ledOn = true;
								ledOff = false;
						}
					})
				}
				// notificationDB.find({}, function(data){
				// 	console.log(data);
				// });
			}else if (message.toString() == "wateredbyUser") {
				var date = new Date();
				var saveData = new notificationDB({process: 'Watered by User', time: (date.toISOString())});
				saveData.save(function(err){
					if (err){
						return err;
					}else{
						console.log("Watered by User");
					}
				})
			}else if (message.toString() == "notEnoughWater") {
				var date = new Date();
				var saveData = new notificationDB({process: 'Not enough water', time: (date.toISOString())});
				saveData.save(function(err){
					if (err){
						return err;
					}else{
						console.log("Not enough water");
					}
				})
			};
		}else{}
	})
})