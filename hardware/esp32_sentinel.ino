#include <WiFi.h>
#include <HTTPClient.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <ArduinoJson.h>

// ─── Configuration ────────────────────────────────────────────────────────
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// Update this to your laptop's IPv4 address where FastAPI is running
const char* serverNameStatus = "http://192.168.1.100:8000/api/hardware/status";
const char* serverNameTelemetry = "http://192.168.1.100:8000/api/telemetry";

// ─── OLED Display Setup ───────────────────────────────────────────────────
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

bool isArmed = false;
String currentPin = "";

unsigned long lastTime = 0;
// Timer set to 2 seconds (2000)
unsigned long timerDelay = 2000;

void setup() {
  Serial.begin(115200);

  // Initialize OLED
  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) { 
    Serial.println(F("SSD1306 allocation failed"));
    for(;;);
  }
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.setCursor(0, 10);
  display.println("LifeMesh Booting...");
  display.display();

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  Serial.println("Connecting to WiFi...");
  display.println("Connecting WiFi...");
  display.display();
  
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
  
  display.clearDisplay();
  display.setCursor(0, 10);
  display.println("Connected!");
  display.print("IP: ");
  display.println(WiFi.localIP());
  display.display();
  delay(2000);
}

void loop() {
  if ((millis() - lastTime) > timerDelay) {
    // Check WiFi connection status
    if(WiFi.status()== WL_CONNECTED){
      HTTPClient http;

      // 1. Check Armed Status
      http.begin(serverNameStatus);
      int httpResponseCode = http.GET();
      
      if (httpResponseCode == 200) {
        String payload = http.getString();
        // Parse JSON
        StaticJsonDocument<200> doc;
        DeserializationError error = deserializeJson(doc, payload);

        if (!error) {
          isArmed = doc["is_armed"];
          currentPin = doc["pin"].as<String>();
          
          updateDisplay();
        }
      } else {
        Serial.print("Error code: ");
        Serial.println(httpResponseCode);
      }
      http.end();

      // 2. Post Telemetry (Simulated or Real Sensor Data)
      if (isArmed) {
        http.begin(serverNameTelemetry);
        http.addHeader("Content-Type", "application/json");
        
        // You would read actual DHT11 and MPU6050 values here
        float temp = 4.5 + random(-5, 5)/10.0;
        float hum = 60.0;
        float shock = 1.0;
        
        StaticJsonDocument<200> tele;
        tele["package_id"] = "PKG_COLDCHAIN_001";
        tele["organ_type"] = "kidney";
        tele["temperature_c"] = temp;
        tele["humidity_pct"] = hum;
        tele["shock_g"] = shock;
        tele["battery_pct"] = 99;
        
        String jsonStr;
        serializeJson(tele, jsonStr);
        int teleResponse = http.POST(jsonStr);
        http.end();
      }

    } else {
      Serial.println("WiFi Disconnected");
    }
    lastTime = millis();
  }
}

void updateDisplay() {
  display.clearDisplay();
  display.setCursor(0, 10);
  
  if (isArmed) {
    display.setTextSize(1);
    display.println("!!! ARMED !!!");
    display.println("Anti-tamper: ON");
    display.println("");
    display.println("Unlock Code:");
    display.setTextSize(2);
    display.println(currentPin);
    display.setTextSize(1);
    display.println("Enter on website");
  } else {
    display.setTextSize(1);
    display.println("LifeMesh Sentinel");
    display.println("Status: UNLOCKED");
    display.println("Waiting for dispatch.");
  }
  
  display.display();
}
