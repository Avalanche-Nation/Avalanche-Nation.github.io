/* all things WebSocket */

var host = "kc.wserv.org";
var port = "64808";
var getreq = "/init6";
var webUri = "wss://" + host + ":" + port + getreq;

/* left over data.. */
var inBuff = "";

function UpdateURI() {
	webUri = "wss://" + host + ":" + port + getreq;
}

function ConnectWebSocket() {
	UpdateURI();
	wsock = new WebSocket(webUri, [ 'binary', 'telnet' ]);
	wsock.binaryType = "arraybuffer";
	wsock.onopen = function(evt) { onOpen(evt) };
	wsock.onclose = function(evt) { onClose(evt) };
	wsock.onerror = function(evt) { onErrorer(evt) };
	wsock.onmessage = function(evt) { onMessage(evt) };
}

function onOpen(evt) {
	console.log("Connected.");
	connected = true;
	connectingb = false;
	OnConnected(); //bnEvent
}

function onClose(evt) {
	connected = false;
	connectingb = false;
	inBuff = ""; /* clear the buffer from the last connection */
	OnDisconnected(); //bnEvent
}

function onErrorer(evt) {
	console.log("Error.");
	NotificationMessage('3', evt.data);
}

function onMessage(evt) {
	var i, edata;
	var data = inBuff + evt.data;
	inBuff = ""; /* reset the inBuffer */
	var count = (data.match(/\r\n/g) || []).length;
	datachunks = data.split('\r\n');

	if(datachunks.length > count) {
		for(i = count; i < datachunks.length; i++) {
			inBuff += datachunks[i];
		}
	}
	for(i = 0; i < count; i++) {
		onHandleMessage(datachunks[i]); //bnEvent
	}
}
