#include <Arduino.h>
#include <WiFi.h>
#include <WiFiMulti.h>
#include <HTTPClient.h>
#define USE_SERIAL Serial
WiFiMulti wifiMulti;

// Insertion de la librairie Adafruit_DHT
#include "DHT.h"
// déclaration de la broche d'entrée
#define DHTPIN 2
// initialisation du capteur
#define DHTTYPE DHT11  // DHT 11
DHT dht(DHTPIN, DHTTYPE);
#define LED 26
#define analogPin 0
int val = 0;

void setup() {

  USE_SERIAL.begin(115200);
  USE_SERIAL.flush();

  USE_SERIAL.println();
  USE_SERIAL.println();
  USE_SERIAL.println();

  for (uint8_t t = 4; t > 0; t--) {
    USE_SERIAL.printf("[SETUP] WAIT %d...\n", t);
    USE_SERIAL.flush();
    delay(1000);
  }

  wifiMulti.addAP("ADE-WIFI-ADMINS", "Bourgogne2018%");
  
  pinMode(analogPin, INPUT);
  pinMode(LED, OUTPUT);

  Serial.println("Test du module KY-015 Test - Temperature et humidite:");

  // début de la mesure
  dht.begin();
}

void loop() {
  double val = analogRead(analogPin);
  Serial.print("valeur : ");
  Serial.println(val);
  if (val > 3750) {
    digitalWrite(LED, HIGH);
  } else {
    digitalWrite(LED, LOW);
  }

  delay(1000);

  // mesure de l'humidité
  float h = dht.readHumidity();
  // mesure de la température
  float t = dht.readTemperature();

  // on vérifie si les mesures sont exécutées sans faute
  // Lors de la détection d'une erreur, affichage d'un message d'erreur
  if (isnan(h) || isnan(t)) {
    Serial.println("Erreur de lecture du capteur");
    return;
  }

  // Envoi dans la console série
  Serial.println("-----------------------------------------------------------");
  Serial.print("Humidite: ");
  Serial.print(h);
  Serial.print(" %\t");
  Serial.print("Temperature: ");
  Serial.print(t);
  Serial.print(char(186));  //Affiche le symbole <°>
  Serial.println("C ");
  Serial.println("-----------------------------------------------------------");
  Serial.println(" ");

  // wait for WiFi connection
    if ((wifiMulti.run() == WL_CONNECTED)) {

      HTTPClient http;

      USE_SERIAL.print("[HTTP] begin...\n");
      // configure traged server and url
      http.begin("https://the-weather-flower.onrender.com/api/data");  //HTTP

      USE_SERIAL.print("[HTTP] GET...\n");
      // start connection and send HTTP header
      http.addHeader("Content-Type", "application/json");
      int httpCode = http.POST("{\"temp\": " + vstr(t) + ",\"moist\": " + vstr(h) + ",\"bright\": " + vstr(val) + "}");

      // httpCode will be negative on error
      if (httpCode > 0) {
        // HTTP header has been send and Server response header has been handled
        USE_SERIAL.printf("[HTTP] GET... code: %d\n", httpCode);

        // file found at server
        if (httpCode == HTTP_CODE_OK) {
          String payload = http.getString();
          USE_SERIAL.println(payload);
        }
      } else {
        USE_SERIAL.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
      }

      http.end();
    }
}
