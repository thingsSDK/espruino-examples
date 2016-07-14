// See http://www.espruino.com/ESP8266_WifiUsage
// And http://www.espruino.com/Reference#Wifi
var wifi = require("Wifi");

// See http://www.espruino.com/Reference#http
var http = require("http");

/**
 * Simple HTML tag generator
 * 
 * @param {string} tag - The HTML tag name e.g. p, div or html
 * @param {string|Array<string>} content - Content of the tag, a string or array of strings
 * @returns {string} - A string of HTML
 */
function h(tag, content) {
  if(Array.isArray(content)) content = content.join("");
  return "<" + tag + ">" + content + "</" + tag + ">";
}

/**
 * Generates a table to display wireless APs SSIDs and channels
 * 
 * @param {Array<object>} networks - An array of APs objects
 * @returns
 */
function generateTableForAPs(networks) {
  var tableHeader = h("tr", [h("th", "SSID"), h("th", "channel")]);
  var rows = networks.map(function(network) { 
      return h("tr", [h("td", network.ssid), h("td", network.channel)]); 
    });
  //Add header to the beginning of the rows array
  rows.unshift(tableHeader);
  return h("table", rows);
}

/**
 * Generates a simple HTML page
 * 
 * @param {string} title - The title of the page, also the H1
 * @param {string|Array<string>} content - Content of the page
 * @returns
 */
function generatePage(title, content) {
  return h("html",
    [
      h("head", [h("title", title), h("style", "th,td {width:100px;border:1px solid #000;}")]),
      h("body", [h("h1", title), content])
    ]
  );
}

/**
 * Handles all requests for the simple HTTP server
 * 
 * @param {any} request - Incomming request
 * @param {any} response - Response to client
 */
function handleRequest(request, response) {
    //Handles all requests
    response.writeHead(200, {'Content-Type': 'text/html'});
    //Scans for accessible networks
    wifi.scan(function(networks){    
        response.end(generatePage("Networks", generateTableForAPs(networks)));
    });
}

/**
 * Handles the connection for the wifi.connect call.
 * 
 * @param {Error} err
 */
function onConnect(err) {
    if(err) {
        console.log("An error has occured :( ", err.message);
    } else {
        http.createServer(handleRequest).listen(80);
        console.log("Visit http://" + wifi.getIP().ip, "in your web browser.");
    }
}

wifi.connect("super-secure-network", { password: "dadadada" }, onConnect);
