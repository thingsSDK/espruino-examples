var isOn = false;
var interval = 500; // 500 milliseconds = 0.5 seconds

setInterval(function(){
  //D2 is the blue LED on the ESP8266 boards
  //Assigns and flips the state on or off
  digitalWrite(D2, isOn = !isOn);
}, interval);