//connect internet
#include <SPI.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <string> 
#include <DNSServer.h>
#include <ESP8266WebServer.h>
#include <WiFiManager.h>  

//connect broker
char MQTT_SERVER[]="broker.mqttdashboard.com";
char* outMoisture = "plantbuddy/moisture";
char* outSystemNotify = "plantbuddy/systemNotify";
char* outBrightness = "plantbuddy/brightness";
char* inLowMoisture = "plantbuddy/lowMoisture";
char* inWater = "plantbuddy/water";
char* inLowLux = "plantbuddy/lowLux";
char* clientId = "clientId-device";
char* user = "plantbuddy";
char* pass = "taenshiki";
byte mac[] = { 0x5E, 0x52, 0xDE, 0xE0, 0xFE, 0xE0 };
WiFiClient espClient;
PubSubClient client(MQTT_SERVER, 1883, 0, espClient);

//choose amount of water
int wateringbyUser = 0;
int max = 100;
char message_water[100];
char message_lowMoisture[100];
char message_lowLux[100];

//Lamp
const int lampPin = D4;
unsigned long timer;
int lowLux = 102;

//water flow sensor
byte sensorInterrupt = D6;
float calibrationFactor = 4.5;
int buttonPushCounter = 0;   // counter for the number of button presses
int buttonState = 0;         // current state of the button
int lastButtonState = 0;     // previous state of the button
volatile byte pulseCount;  
float flowRate;
unsigned int flowMilliLitres;
unsigned long totalMilliLitres;
unsigned long oldTime;

//Multiplexer
int Vin[8];
int c=0;
int b2,b1,b0;
int moisture = 0;
int brightness = 0;

//Solenoid
const int solenoidPin = D3;
int lowMoisture = 921;
int watering = 0;

//water flow sensor
void pulseCounter()
{
  pulseCount++;
}

void waterbyUser(int aoW, int moisOld){
  digitalWrite(solenoidPin, HIGH);
  if (aoW == 100){
    delay(10000);
    digitalWrite(solenoidPin, LOW);
    digitalWrite(D9,0);
    digitalWrite(D8,0);
    digitalWrite(D7,0);
    Vin[0]=analogRead(A0);
    if (Vin[0] >= moisOld-20 && Vin[0] > 350){
      client.publish(outSystemNotify, "notEnoughWater");
      Serial.println("Not enough Water");
    }
  }else if (aoW == 200){
    delay(20000);
    digitalWrite(solenoidPin, LOW);
    digitalWrite(D9,0);
    digitalWrite(D8,0);
    digitalWrite(D7,0);
    Vin[0]=analogRead(A0);
    if (Vin[0] >= moisOld-20 && Vin[0] > 350){
      client.publish(outSystemNotify, "notEnoughWater");
      Serial.println("Not enough Water");
    }
  }else if (aoW == 300){
    delay(30000);
    digitalWrite(solenoidPin, LOW);
    digitalWrite(D9,0);
    digitalWrite(D8,0);
    digitalWrite(D7,0);
    Vin[0]=analogRead(A0);
    Serial.print(Vin[0]);
    Serial.println(moisOld);
    if (Vin[0] >= moisOld-20 && Vin[0] > 350){
      client.publish(outSystemNotify, "notEnoughWater");
      Serial.println("Not enough Water");
    }
  }else if (aoW == 400){
    delay(40000);
    digitalWrite(solenoidPin, LOW);
    digitalWrite(D9,0);
    digitalWrite(D8,0);
    digitalWrite(D7,0);
    Vin[0]=analogRead(A0);
    if (Vin[0] >= moisOld-20 && Vin[0] > 350){
      client.publish(outSystemNotify, "notEnoughWater");
      Serial.println("Not enough Water");
    }
  }else if (aoW == 500){
    delay(50000);
    digitalWrite(solenoidPin, LOW);
    digitalWrite(D9,0);
    digitalWrite(D8,0);
    digitalWrite(D7,0);
    Vin[0]=analogRead(A0);
    if (Vin[0] >= moisOld-20 && Vin[0] > 350){
      client.publish(outSystemNotify, "notEnoughWater");
      Serial.println("Not enough Water");
    }
  }
  client.publish(outSystemNotify, "wateredbyUser");
}

//Amount of Water
void callback(char* topic, byte* payload, unsigned int length) {
  String strTopic(topic);
  if (strTopic == "plantbuddy/water"){
    int i = 0;
    Serial.println(topic);
    Serial.print("] ");
    for (i=0; i < length; i++) {
      Serial.print((char)payload[i]);
      message_water[i] = payload[i];
    }
    Serial.println();
    String amountofWater(message_water);
    Serial.println(amountofWater);
    if (amountofWater == "100"){
      Serial.println("amountofWater==>100ml");
      waterbyUser(100, Vin[0]);
    }else if (amountofWater == "200"){
      Serial.println("amountofWater==>200ml");
      waterbyUser(200, Vin[0]);
    }else if (amountofWater == "300"){
      Serial.println("amountofWater==>300ml");
      waterbyUser(300, Vin[0]);
    }else if (amountofWater == "400"){
      Serial.println("amountofWater==>400ml");
      waterbyUser(400, Vin[0]);
    }else if (amountofWater == "500"){
      Serial.println("amountofWater==>500ml");
      waterbyUser(500, Vin[0]);
    }
    for (i=0; i < length; i++) {
      message_water[i] = '\0';
    }
  }else 
    if(strTopic == "plantbuddy/lowMoisture"){
    int i = 0;
    Serial.println(topic);
    Serial.print("] ");
    for (i=0; i < length; i++) {
      Serial.print((char)payload[i]);
      message_lowMoisture[i] = payload[i];
    }
    Serial.println();
    String strLowMoisture(message_lowMoisture);
    Serial.println(strLowMoisture);
    if (strLowMoisture == "10"){
      lowMoisture = 250 + 77;
      Serial.println("lowMoisture==>10%");
    }else if (strLowMoisture == "20"){
      lowMoisture = 250 + 154;
      Serial.println("lowMoisture==>20%");
    }else if (strLowMoisture == "30"){
      lowMoisture = 250 + 232;
      Serial.println("lowMoisture==>30%");
    }else if (strLowMoisture == "40"){
      lowMoisture = 250 + 309;
      Serial.println("lowMoisture==>40%");
    }else if (strLowMoisture == "50"){
      lowMoisture = 250 + 387;
      Serial.println("lowMoisture==>50%");
    }else if (strLowMoisture == "60"){
      lowMoisture = 250 + 464;
      Serial.println("lowMoisture==>60%");
    }else if (strLowMoisture == "70"){
      lowMoisture = 250 + 541;
      Serial.println("lowMoisture==>70%");
    }else if (strLowMoisture == "80"){
      lowMoisture = 250 + 619;
      Serial.println("lowMoisture==>80%");
    }else if (strLowMoisture == "90"){
      lowMoisture = 250 + 696;
      Serial.println("lowMoisture==>90%");
    }
    for (i=0; i < length; i++) {
      message_lowMoisture[i] = '\0';
    }
  }else if(strTopic == "plantbuddy/lowLux"){
    int i = 0;
    Serial.println(topic);
    Serial.print("] ");
    for (i=0; i < length; i++) {
      Serial.print((char)payload[i]);
      message_lowLux[i] = payload[i];
    }
    Serial.println();
    String strLowLux(message_lowLux);
    Serial.println(strLowLux);
    if (strLowLux == "10"){
      lowLux = 102;
      Serial.println("lowLux==>10%");
    }else if (strLowLux == "20"){
      lowLux = 204;
      Serial.println("lowLux==>20%");
    }else if (strLowLux == "30"){
      lowLux = 307;
      Serial.println("lowLux==>30%");
    }else if (strLowLux == "40"){
      lowLux = 409;
      Serial.println("lowLux==>40%");
    }else if (strLowLux == "50"){
      lowLux = 512;
      Serial.println("lowLux==>50%");
    }else if (strLowLux == "60"){
      lowLux = 614;
      Serial.println("lowLux==>60%");
    }else if (strLowLux == "70"){
      lowLux = 716;
      Serial.println("lowLux==>70%");
    }else if (strLowLux == "80"){
      lowLux = 819;
      Serial.println("lowLux==>80%");
    }else if (strLowLux == "90"){
      lowLux = 921;
      Serial.println("lowLux==>90%");
    }
    for (i=0; i < length; i++) {
      message_lowLux[i] = '\0';
    }
  }
}

void setup() {
  //initialize serial communication:
  Serial.begin(9600);
  WiFiManager wifiManager;
  wifiManager.setCustomHeadElement("<style>html{background: #333333;} h1,h3{color:#2AEC9D;text-align:center;} button{color:#FFF;background-color:#00796B;} a,span,div{color:#FFF;}</style>");
  wifiManager.startConfigPortal("PlantBuddy");

  //connect broker
  Serial.println("Net begin");
  if (client.connect(clientId,user,pass)) { 
    Serial.println("Successfully connected with MQTT");
    client.subscribe("plantbuddy/lowMoisture");
    client.subscribe("plantbuddy/lowLux");
    client.subscribe("plantbuddy/water");// Subcription
  }else { 
    Serial.println("cant connected with MQTT");
  }

  //water flow sensor
  pulseCount        = 0;
  flowRate          = 0.0;
  flowMilliLitres   = 0;
  totalMilliLitres  = 0;
  oldTime           = 0;

  //Multiplxer
  pinMode(D7, OUTPUT); 
  pinMode(D8, OUTPUT); 
  pinMode(D9, OUTPUT);
  pinMode(A0, INPUT);

  //Lamp
  pinMode(lampPin, OUTPUT);
  timer = 0;

  //Solenoid
  pinMode(solenoidPin, OUTPUT);

  client.setCallback(callback);
}

void loop() {
  //Multiplexer
  if(c==0){b2=0,b1=0,b0=0;}
//  else if(c==1){b2=0,b1=0,b0=1;}
//  else if(c==2){b2=0,b1=1,b0=0;}
//  else if(c==3){b2=0,b1=1,b0=1;}
//  else if(c==4){b2=1,b1=0,b0=0;}
//  else if(c==5){b2=1,b1=0,b0=1;}
  else if(c==6){b2=1,b1=1,b0=0;}
//  else if(c==7){b2=1,b1=1,b0=1;}
  digitalWrite(D9,b2);
  digitalWrite(D8,b1);
  digitalWrite(D7,b0);
  Vin[c]=analogRead(A0);
//  c++; 
  if(c==0)
    c=6;
  else if(c==6)
    c=0;
  char moistureChar [4];
  moisture = map(Vin[0], 300, 1023, 100, 0);
  sprintf(moistureChar , "%d" , moisture);
  client.publish(outMoisture, moistureChar);
  Serial.print("Moisture = ");
  Serial.print(Vin[0]);
  char brightnessChar [4];
  brightness = map(Vin[6], 1, 1023, 0, 100);
  sprintf(brightnessChar , "%d" , brightness);
  client.publish(outBrightness, brightnessChar);
  Serial.print("  ||  Brightness = ");
  Serial.println(Vin[6]);

  //Lamp
  if((millis() - timer) > 5000){
    //Check Status
   Serial.print("lowLux = ");
   Serial.println(lowLux);
   Serial.print("lowMoisture = ");
   Serial.println(lowMoisture);
    if (Vin[6] > lowLux){
      digitalWrite(lampPin, LOW);
      client.publish(outSystemNotify, "ledOFF");
      Serial.println("LED OFF");
    }else if(Vin[6] <= lowLux){
      digitalWrite(lampPin, HIGH);
      client.publish(outSystemNotify, "ledON");
      Serial.println("LED ON");
    }
    timer = millis();
  }

  //Solenoid
  if (Vin[0] > lowMoisture){
      digitalWrite(solenoidPin, HIGH);
      //client.publish(outSystemNotify, "ledOFF");
      Serial.println("Watering");
      watering = 1;
   } else if(Vin[0] <= lowMoisture && watering == 1 && wateringbyUser == 0){
      digitalWrite(solenoidPin, LOW);
      Serial.println("Watered");
      client.publish(outSystemNotify, "Watered");
      watering = 0;
   }
  client.loop();
}
