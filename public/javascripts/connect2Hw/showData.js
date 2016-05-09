var MQTTbroker = 'broker.mqttdashboard.com';
var MQTTport = 8000;
var MQTTsubMoisture = 'plantbuddy/moisture'; 
var MQTTsubBrightness = 'plantbuddy/brightness';

var chart; // global variuable for chart
var dataTopics = new Array();

var client = new Paho.MQTT.Client(MQTTbroker, MQTTport, '/ws' ,"clientId-receive");
client.onMessageArrived = onMessageArrived;
client.onConnectionLost = onConnectionLost;

var options = {
	useSSL: false,
	userName: "plantbuddy",
	password: "taenshiki",
	onSuccess: function () {
		console.log("mqtt connected");
		client.subscribe(MQTTsubMoisture);
		client.subscribe(MQTTsubBrightness);
	},
	onFailure: function (message) {
		console.log("Connection failed, ERROR: " + message.errorMessage);
	}
};
function onConnectionLost(responseObject) {
	console.log("connection lost: " + responseObject.errorMessage);
};
function onMessageArrived(message) {
	if (message.destinationName == "plantbuddy/moisture"){
		console.log(message.destinationName, '',message.payloadString);
		document.getElementById("moistureData").innerHTML = message.payloadString;
		if(message)
		document.getElementById('test').style.width = message.payloadString + "%";
	}else if (message.destinationName == "plantbuddy/brightness"){
		console.log(message.destinationName, '',message.payloadString);
		document.getElementById("brightnessData").innerHTML = message.payloadString;
		if(message)
		document.getElementById('test2').style.width = message.payloadString + "%";
	}
};
function init() {
	client.connect(options);
};