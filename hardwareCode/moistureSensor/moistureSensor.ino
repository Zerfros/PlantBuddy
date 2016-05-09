#include <SPI.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>

const char* ssid     = "Clapyourhands";    
const char* password = "1212312121"; 
int moisturePin = A0;

char MQTT_SERVER[]="broker.mqttdashboard.com";
char* outTopic = "plantbuddy/moisture";
char* clientId = "clientId-moistureSensor";
char* user = "plantbuddy";
char* pass = "taenshiki";
byte mac[] = { 0x5E, 0x52, 0xDE, 0xE0, 0xFE, 0xE0 };

WiFiClient wifiClient;
PubSubClient client(MQTT_SERVER, 1883, NULL, wifiClient);

void setup() 
{
    Serial.begin(9600);
    Serial.println("Net begin");
    Serial.print("Connecting to ");
    Serial.println(ssid);     
    WiFi.begin(ssid, password);
    pinMode(A0, INPUT);
   
    while (WiFi.status() != WL_CONNECTED)   {
      delay(500);
      Serial.print(".");
    }
    Serial.println(""); 
    Serial.println("WiFi connected");   
    Serial.println("IP address: ");   
    Serial.println(WiFi.localIP());  
     
  
    Serial.println("Net begin");
    if (client.connect(clientId,user,pass)) { 
      Serial.println("Successfully connected with MQTT");
      //client.subscribe("OnOffLight"); // Subcription
    }else { 
      Serial.println("cant connected with MQTT");
    }
}
void loop() {
  int valueInt = analogRead(moisturePin);
  char valueChar [4];
  int moisture = 0;
  moisture = map(valueInt, 320, 1023, 100, 0);
  sprintf(valueChar , "%d" , moisture);
  client.publish(outTopic, valueChar);
  delay(500);
  Serial.print("moisture = ");
  Serial.print(moisture);
  Serial.println(" %");
  Serial.print("valueInt = ");
  Serial.println(valueInt);
  client.loop();
}
