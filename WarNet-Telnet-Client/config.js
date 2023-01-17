/* configurations form */

// Define the vars, other vars may be in other objects
var username = "";
var password = "";
var home = "init6";

/* did we hit connect, if so we initialized the connecting dont allow it again */
var connectingb = false;
	
/* init */
function initFormData() {
	/* init creds */
	document.getElementById('reconnectsf').checked = reconnectbool;
	document.getElementById('usernamef').value = username;
	document.getElementById('passwordf').value = password;
	document.getElementById('homef').value = home;
	/* donkery for the server */
	switch(host) {
		case('kc.wserv.org'):
			document.getElementById('serverf').selectedIndex = 2;
			break;
		default:
			document.getElementById('serverf').selectedIndex = 0;
			break;
	}
}

//drop down the config
function myMenu() {
    var dropdbox = document.getElementById("dropdbox");

    if (dropdbox.style.display === "block") {
        dropdbox.style.display = "none";
    } else {
		dropdbox.style.display = "block";
		
		dropdbox.style.position = "relative";
		dropdbox.style.zIndex = "1000";
    }
}
	
/* credentials */
function mySubmit() {
	if(connectingb) { myMenu(); NotificationMessage('3', "Error: You are already attempting to connect."); return; }
	if(connected) { myMenu(); NotificationMessage('3', "Error: You are already connected."); return; }
	connectingb = true;
	//console.log("mySubmit clicked");
	/* reconnect value */
	reconnectbool = document.getElementById('reconnectsf').checked;
	username = document.getElementById('usernamef').value;
	password = document.getElementById('passwordf').value;
	home = document.getElementById('homef').value;
	host = document.getElementById('serverf').options[document.getElementById('serverf').selectedIndex].text;
	
	var berror = false;
	if(username.length < 1) {
		berror = true;
		NotificationMessage('3', "Error: username not set.");
	}
	if(password.length < 1) {
		berror = true;
		NotificationMessage('3', "Error: password not set.");
	}
	if(home.length < 1) {
		berror = true;
		NotificationMessage('3', "Error: home not set.");
	}
	if(host.length < 1) {
		berror = true;
		NotificationMessage('3', "Error: host not set.");
	}

	myMenu(); 			//drop the menu
	if(berror) {
		berror = false;
		return;
	}
	ConnectWebSocket(); //connect
}

function myDisconnect() {
	if(connected == false) { myMenu(); NotificationMessage('3', "Error: You are not connected."); return; }
	selfdisconnected = true;
	//wsock.send('\0' + 'your good bye message here' + '\255');
	wsock.close(1000, "Deliberate disconnection");
	myMenu(); 			//drop the menu
}