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
  Read_vin();
  displaySerial();
}
void Read_vin()
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
}
void displaySerial()
{
  for(int k=0;k<=7;k++)
  {
    Serial.print(" Vin");
    Serial.print(k+1);
    Serial.print("=");
    Serial.print(Vin[k],2);
  }
  Serial.println(" ");
}
