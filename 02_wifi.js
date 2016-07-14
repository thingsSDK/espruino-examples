// See Wifi Documentation here: http://www.espruino.com/ESP8266_WifiUsage

var wifi = require("Wifi");

/**
 * Handles the connection for the wifi.connect call.
 * 
 * @param {Error} err
 */
function onConnect(err) {
    if(err) {
        console.log("An error has occured :( ", err.message);
    } else {
        console.log("Connected with IP : ", wifi.getIP().ip);
    }
}

wifi.connect("super-secure-network", { password: "dadadada" }, onConnect);
