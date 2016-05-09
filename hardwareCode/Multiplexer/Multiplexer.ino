float Vin[8];
int c=0;
int b2,b1,b0;
void setup()
{
  Serial.begin(9600);
  pinMode(D7, OUTPUT); 
  pinMode(D8, OUTPUT); 
  pinMode(D9, OUTPUT);
  pinMode(A0, INPUT);
}
void loop()
{
  if(c==0){b2=0,b1=0,b0=0;}
  else if(c==1){b2=0,b1=0,b0=1;}
  else if(c==2){b2=0,b1=1,b0=0;}
  else if(c==3){b2=0,b1=1,b0=1;}
  else if(c==4){b2=1,b1=0,b0=0;}
  else if(c==5){b2=1,b1=0,b0=1;}
  else if(c==6){b2=1,b1=1,b0=0;}
  else if(c==7){b2=1,b1=1,b0=1;}
  digitalWrite(D9,b2);
  digitalWrite(D8,b1);
  digitalWrite(D7,b0);
  Vin[c]=analogRead(A0);
  c++; if(c>7)c=0;

  Serial.print("Moisture = ");
  Serial.print(Vin[1],2);
  Serial.print("  ||  Brightness = ");
  Serial.println(Vin[7],2);
}
