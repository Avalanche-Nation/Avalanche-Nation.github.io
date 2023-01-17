/* everything relating to the channel name box on screen */

// Define objects
var channeltitle;
var currentchannel = "";

function OnUpdateChannel() {
	channeltitle.innerText = currentchannel + " (" + document.getElementById("userlisting").childElementCount + ")";
}

function OnChannel(channelname) {
	clearuserlisting();
	currentchannel = channelname;
	OnUpdateChannel()
}
