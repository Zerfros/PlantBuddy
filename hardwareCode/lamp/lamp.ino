#define Lamp1 D10 //กำหนดขาที่นำไปต่อกับรีเลย์
char test ; //สร้างตัวแปรไว้สำหรับรอรับข้อมูล
void setup() 
{
  // Open serial communications and wait for port to open:
  Serial.begin(9600);
  pinMode(Lamp1, OUTPUT); //กำหนดโหมดให้เป็น Output
}
void loop() // run over and over
{
  if (Serial.available()) // ตรวจสอบว่ามีข้อมูลเข้ามาหรือไม่
  test = Serial.read();
  else if (test == '1') //ถ้าข้อมูลที่เข้ามาคือ 1 , 3 ให้ทำงานตามที่กำหนด
  {
    digitalWrite(Lamp1, HIGH);
  }
  else if (test == '3')
  {
    digitalWrite(Lamp1, LOW);
  }
}
