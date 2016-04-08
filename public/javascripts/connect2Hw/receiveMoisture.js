
var MQTTbroker = 'broker.mqttdashboard.com';
var MQTTport = 8000;
var MQTTsubTopic = 'plantbuddy/soil'; 

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
		client.subscribe(MQTTsubTopic);
	},
	onFailure: function (message) {
		console.log("Connection failed, ERROR: " + message.errorMessage);
	}
};
function onConnectionLost(responseObject) {
	console.log("connection lost: " + responseObject.errorMessage);
};
function onMessageArrived(message) {
	console.log(message.destinationName, '',message.payloadString);
	document.getElementById("moistureData").innerHTML = message.payloadString;
	if(message)
	document.getElementById('test').style.width = message.payloadString + "%";


};
function init() {
	client.connect(options);
};