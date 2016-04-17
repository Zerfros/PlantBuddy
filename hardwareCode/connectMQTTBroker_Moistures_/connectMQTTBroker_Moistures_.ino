#include <PubSubClient.h>

#include <SPI.h>
#include <Ethernet.h>
#include <ESP8266WiFi.h>

const char* ssid     = "Jupiter";    
const char* password = "17611761"; 

char MQTT_SERVER[]="broker.mqttdashboard.com";
//byte MQTT_SERVER[] = { 161, 246, 38, 78 };

char* outTopic = "plantbuddy/soil";
char* clientId = "clientId-device";
char* user = "plantbuddy";
char* pass = "taenshiki";

int soilPin = A0;
byte mac[] = { 0x3E, 0x52, 0xDE, 0xE0, 0xFE, 0xE0 };
//void callback(char* topic, byte* payload, unsigned int length);

EthernetClient ethClient; // Ethernet object
PubSubClient client( MQTT_SERVER, 1883, ethClient); // MQTT object

/*void callback(char* topic, byte* payload, unsigned int length) {
  Serial.println(topic);
  payload[length] = '\0';
  String strPayload = String((char*)payload);
  Serial.println(strPayload);
  if (strPayload == "On"){
    digitalWrite(4, HIGH);
  }else if (strPayload == "Off"){
    digitalWrite(4, LOW);
  }
}*/

void setup() {
  Serial.begin(9600);
  Serial.println("Net begin");
  pinMode(4, OUTPUT);

  WiFi.begin(ssid, password);
  
  if (Ethernet.begin(mac) == 0){
    Serial.println("Failed to configure Ethernet using DHCP");
    return;
  }
  delay(2000);
  Serial.print("IP: "); // A little debug.. show IP address
  Serial.println(Ethernet.localIP());

  if (client.connect(clientId,user,pass)) { 
    Serial.println("Successfully connected with MQTT");
    //client.subscribe("OnOffLight"); // Subcription
  }else { 
    Serial.println("cant connected with MQTT");
  }
}
  
void loop(){
  int valueInt = analogRead(soilPin);
  char valueChar [4];
  int soil = 0;
  soil = map(valueInt, 280, 1023, 100, 0);
  sprintf(valueChar , "%d" , soil);
  client.publish(outTopic, valueChar);
  delay(500);
  Serial.println(valueChar);
  client.loop(); // loop for ever waiting for MQTT
}
