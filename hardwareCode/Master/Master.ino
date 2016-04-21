//connect internet
#include <SPI.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
const char* ssid     = "Potae's iPhone";    
const char* password = "Supasit19";
WiFiClient wifiClient;

//connect broker
char MQTT_SERVER[]="broker.mqttdashboard.com";
char* outmoisture = "plantbuddy/moisture";
char* outsystemNotify = "plantbuddy/systemNotify";
char* clientId = "clientId-device";
char* user = "plantbuddy";
char* pass = "taenshiki";
byte mac[] = { 0x5E, 0x52, 0xDE, 0xE0, 0xFE, 0xE0 };
PubSubClient client(MQTT_SERVER, 1883, NULL, wifiClient);

//choose amount of water
const int  buttonPin = D5;    
const int ledPina = D0; 
const int ledPinb= D1;
const int ledPinc = D2; 
const int ledPind= D3;
int max = 200;

//water flow sensor
//byte statusLed    = 4;
byte sensorInterrupt = 12;
//byte sensorPin       = 0;
float calibrationFactor = 4.5;
int buttonPushCounter = 0;   // counter for the number of button presses
int buttonState = 0;         // current state of the button
int lastButtonState = 0;     // previous state of the button
volatile byte pulseCount;  
float flowRate;
unsigned int flowMilliLitres;
unsigned long totalMilliLitres;
unsigned long oldTime;

void setup() {
  //initialize serial communication:
  Serial.begin(9600);

  //connect internet
  Serial.println("Net begin");
  Serial.print("Connecting to ");
  Serial.println(ssid);     
  WiFi.begin(ssid, password);
 while (WiFi.status() != WL_CONNECTED)   {
    delay(500);
    Serial.print(".");
  }
  Serial.println(""); 
  Serial.println("WiFi connected");   
  Serial.println("IP address: ");   
  Serial.println(WiFi.localIP()); 

  //connect broker
  Serial.println("Net begin");
  if (client.connect(clientId,user,pass)) { 
    Serial.println("Successfully connected with MQTT");
    //client.subscribe("OnOffLight"); // Subcription
  }else { 
    Serial.println("cant connected with MQTT");
  }

  //choose amount of water
  pinMode(buttonPin, INPUT);
  pinMode(ledPina, OUTPUT);
  pinMode(ledPinb, OUTPUT);
  pinMode(ledPinc, OUTPUT);
  pinMode(ledPind, OUTPUT);

  //water flow sensor
  pulseCount        = 0;
  flowRate          = 0.0;
  flowMilliLitres   = 0;
  totalMilliLitres  = 0;
  oldTime           = 0;
  attachInterrupt(sensorInterrupt, pulseCounter, FALLING);
}

void loop() {
  //choose amount of water
  buttonState = digitalRead(buttonPin);
  if (buttonState != lastButtonState) {
    if (buttonState == HIGH) {
      buttonPushCounter++;
      Serial.println("on");
      Serial.print("number of button pushes:  ");
      Serial.println(buttonPushCounter);
    }
    else {
      if (buttonPushCounter>3){
        buttonPushCounter=0;
      }
      Serial.println("off");
    }
    delay(50);
  }
  lastButtonState = buttonState;
  if (buttonPushCounter ==1) {
    digitalWrite(ledPina, HIGH);
    digitalWrite(ledPinb, LOW);
    digitalWrite(ledPinc, LOW);
    digitalWrite(ledPind, LOW);
    max = 200;
  } else if(buttonPushCounter ==2) {
    digitalWrite(ledPina, LOW);
    digitalWrite(ledPinb, HIGH);
    digitalWrite(ledPinc, LOW);
    digitalWrite(ledPind, LOW);
    max = 500;
  } else if(buttonPushCounter ==3) {
    digitalWrite(ledPina, LOW);
    digitalWrite(ledPinb, LOW);
    digitalWrite(ledPinc, HIGH);
    digitalWrite(ledPind, LOW);
    max = 700;
  }else if(buttonPushCounter ==4) {
    digitalWrite(ledPina, LOW);
    digitalWrite(ledPinb, LOW);
    digitalWrite(ledPinc, LOW);
    digitalWrite(ledPind, HIGH);
    max = 1000;
  }

  //water flow sensor
  if((millis() - oldTime) > 1000)
  { 
    detachInterrupt(sensorInterrupt);
    flowRate = ((1000.0 / (millis() - oldTime)) * pulseCount) / calibrationFactor;
    oldTime = millis();
    flowMilliLitres = (flowRate / 60) * 1000;
    totalMilliLitres += flowMilliLitres;
    unsigned int frac;
    Serial.print("Flow rate: ");
    Serial.print(int(flowRate));  // Print the integer part of the variable
    Serial.print(".");             // Print the decimal point
    frac = (flowRate - int(flowRate)) * 10;
    Serial.print(frac, DEC) ;      // Print the fractional part of the variable
    Serial.print("L/min");
    Serial.print("  Current Liquid Flowing: ");             // Output separator
    Serial.print(flowMilliLitres);
    Serial.print("mL/Sec");
    Serial.print("  Output Liquid Quantity: ");             // Output separator
    Serial.print(totalMilliLitres);
    Serial.println("mL");
    pulseCount = 0;
    attachInterrupt(sensorInterrupt, pulseCounter, FALLING);
    if (totalMilliLitres>max){
      digitalWrite(ledPind, HIGH);
      totalMilliLitres=0;
      Serial.println("totalMilliLitres has reset");
      delay(2000);
      digitalWrite(ledPind, LOW);
      client.publish(outsystemNotify, "Watered");
    }
  }
}

//water flow sensor
void pulseCounter()
{
  pulseCount++;
}









