/* global vars needed everywhere */

// Define the connection parameters
var loggedname = ""; /* server bug at design level, the server should send NAME before even getting the motd but does not */
var connected = false;
var output;// = document.getElementById("main-chat");