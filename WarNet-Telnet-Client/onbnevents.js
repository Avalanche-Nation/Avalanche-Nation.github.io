/* all bn related message events */

var reconnectbool = true;

/* onConnected */
function OnConnected() {
	NotificationMessage('1', 'Connected.');
	wsock.send("C1\r\nACCT " + username + "\r\nPASS " + password + "\r\nHOME " + home + "\r\nLOGIN\r\n");
}

/* onDisconnected */
function OnDisconnected() {
	channeltitle.innerText = ""; //reset the channel title
	clearuserlisting();
		
	NotificationMessage('3', 'Disconnected.');
	if(selfdisconnected) {
		selfdisconnected = false;
		return;
	}
	if(reconnectbool) {
		ConnectWebSocket();
	}
}

/* your self message comes back to you on init6 heh */
function OnSelfMessage(varusername, varmessage, varself = true) {
	var pre = document.createElement("li");
	var partime = document.createElement("p");
	partime.setAttribute('class', 'timestamp-cls');
	partime.innerText = $TimeStamp();
	var par = document.createElement("p");
	var par2 = document.createElement("p");
	var par3 = document.createElement("p");
	var par4 = document.createElement("p");

	par.innerText = '<';
	par2.innerText = varusername;
	if(varself) {
		par2.setAttribute('class', $NotificationMessageType('self'));
	}
	par3.innerText = '>';
	par4.setAttribute('class', 'normal-em');
	par4.innerText = varmessage;

	pre.style.wordWrap = "break-word";
		
	pre.appendChild(partime);
	pre.appendChild(par);
	pre.appendChild(par2);
	pre.appendChild(par3);
	pre.appendChild(par4);

	messagelisting.appendChild(pre);
	output.scrollTop = output.scrollHeight;
}

/* onUser */
function OnUserInChannel(username, gamestring, flag, ping) {
    var $messageout = username + ' is here in the channel. using: ' + $Statstring(gamestring);
    NotificationMessage('userinchannel', $messageout);
    AddUser(username, gamestring, flag, ping);
	
	OnUpdateChannel();
}

/* onLeave */
function OnUserLeave(username) {
    removeuser(username);
    NotificationMessage('userleftchannel', username + ' has left the channel.');

	OnUpdateChannel();
}

/* onJoin */
function OnUserJoin(username, gamestring, flag, ping) {
    var $messageout = username + ' has joined the channel, on client: ' + $Statstring(gamestring);
    NotificationMessage('userjoinedchannel', $messageout);
    AddUser(username, gamestring, flag, ping);

	OnUpdateChannel();
}

/* onFlag */
function OnUserFlags(username, gamestring, flag, ping) {
	updateuser(username, gamestring, flag, ping);
}

/* onEmote */
function OnEmote(username,message) {
    var pre = document.createElement("li");
    var partime = document.createElement("p");
    partime.setAttribute('class', 'timestamp-cls');
    partime.innerText = $TimeStamp();
    var par = document.createElement("p");
    var par2 = document.createElement("p");
    var par3 = document.createElement("p");

    par.setAttribute('class', 'emote-cls');
    par.innerText = '<';
    par2.innerText = username;
    if(loggedname == username) {
        par2.setAttribute('class', $NotificationMessageType('self'));
    }
    par3.setAttribute('class', 'emote-em-cls');
    par3.innerText = message + '>';

    pre.style.wordWrap = "break-word";
    
    pre.appendChild(partime);
    pre.appendChild(par);
    pre.appendChild(par2);
    pre.appendChild(par3);

    messagelisting.appendChild(pre);
    output.scrollTop = output.scrollHeight;
}

/* onWhisperFrom */
function OnWhisperFrom(username,message) {
    var pre = document.createElement("li");
    pre.setAttribute('class', 'whisper-box');
    var partime = document.createElement("p");
    partime.setAttribute('class', 'timestamp-cls');
    partime.innerText = $TimeStamp();

    var par = document.createElement("p");
    var par2 = document.createElement("p");
    var par3 = document.createElement("p");
    var par4 = document.createElement("p");

    par.setAttribute('class', 'w-from-cls');
    par.innerText = '<From:';
    par2.setAttribute('class', 'normal-em');
    par2.innerText = username;
    par3.setAttribute('class', 'w-from-cls');
    par3.innerText = '>';
    par4.setAttribute('class', 'w-from-em-cls');
    par4.innerText = message;

    pre.style.wordWrap = "break-word";
    
    pre.appendChild(partime);
    pre.appendChild(par);
    pre.appendChild(par2);
    pre.appendChild(par3);
    pre.appendChild(par4);

    messagelisting.appendChild(pre);
    output.scrollTop = output.scrollHeight;
}

/* onWhisperTo */
function OnWhisperTo(username,message) {
    var pre = document.createElement("li");
    pre.setAttribute('class', 'whisper-box');
    var partime = document.createElement("p");
    partime.setAttribute('class', 'timestamp-cls');
    partime.innerText = $TimeStamp();

    var par = document.createElement("p");
    var par2 = document.createElement("p");
    var par3 = document.createElement("p");
    var par4 = document.createElement("p");

    par.setAttribute('class', 'w-from-cls');
    par.innerText = '<To:';
    par2.setAttribute('class', 'normal-em');
    par2.innerText = username;
    par3.setAttribute('class', 'w-from-cls');
    par3.innerText = '>';
    par4.setAttribute('class', 'w-from-em-cls');
    par4.innerText = message;

    pre.style.wordWrap = "break-word";
    
    pre.appendChild(partime);
    pre.appendChild(par);
    pre.appendChild(par2);
    pre.appendChild(par3);
    pre.appendChild(par4);

    messagelisting.appendChild(pre);
    output.scrollTop = output.scrollHeight;
}

/* data recieved */
function onHandleMessage(datarecieved) {
	var text = datarecieved.replace('\t', '&#9;').replace('      ', ' ').replace('     ', ' ').replace('    ', ' ').replace('   ', ' ').replace('  ', ' ');
	var res = text.split(" ");
	if(res[0].toLowerCase() == "ping") {
		wsock.send('/pong ' + res[1] + '\r\n');
	} else if (res[0].toLowerCase() == "user" && res[1].toLowerCase() == "talk" && res[2].toLowerCase() == "to") {
		/* we spoke in the channel */
		var strlength = res[0].length + res[1].length + res[2].length + res[3].length + 4;
		var thistext = text.substring(strlength);
		OnSelfMessage(res[3], thistext);
	} else if (res[0].toLowerCase() == "user" && res[1].toLowerCase() == "talk" && res[2].toLowerCase() == "from") {
		/* they spoke in the channel */
		var strlength = res[0].length + res[1].length + res[2].length + res[3].length + 4;
		var thistext = text.substring(strlength);
		OnSelfMessage(res[3], thistext, false);
	} else if (res[0].toLowerCase() == "channel" && res[1].toLowerCase() == "join") {
		/* entered the channel */			
		var strlength = res[0].length + res[1].length + 2;
		OnChannel(text.substring(strlength));
	} else if (res[0].toLowerCase() == "server" && res[1].toLowerCase() == "topic") {
		/* server topic INFO... */
		var strlength = res[0].length + res[1].length + 2;
		NotificationMessage('2', "Info: " + text.substring(strlength));
	} else if (res[0].toLowerCase() == "server" && res[1].toLowerCase() == "info") {
		/* server info */
		var strlength = res[0].length + res[1].length + 2;
		NotificationMessage('2', "Info: " + text.substring(strlength));
	} else if (res[0].toLowerCase() == "server" && res[1].toLowerCase() == "error") {
		/* server error */
		var strlength = res[0].length + res[1].length + 2;
		NotificationMessage('3', "Error: " + text.substring(strlength));
	} else if (res[0].toLowerCase() == "user" && res[1].toLowerCase() == "in") {
		/* users in channel */
		OnUserInChannel(res[4], res[5], res[2], res[3]);
	} else if (res[0].toLowerCase() == "user" && res[1].toLowerCase() == "leave") {
		/* user left channel */
		OnUserLeave(res[2]);
	} else if (res[0].toLowerCase() == "user" && res[1].toLowerCase() == "join") {
		/* user joined channel */
		OnUserJoin(res[4], res[5], res[2], res[3]);
	} else if (res[0].toLowerCase() == "user" && res[1].toLowerCase() == "update") {
		/* user flag update */
		OnUserFlags(res[4], res[5], res[2], res[3]);
	} else if (res[0].toLowerCase() == "user" && res[1].toLowerCase() == "emote") {
		/* user emote */
		var strlength = res[0].length + res[1].length + res[2].length + 3;
		OnEmote(res[2], text.substring(strlength));
	} else if (res[0].toLowerCase() == "user" && res[1].toLowerCase() == "whisper" && res[2].toLowerCase() == "to") {
		/* user whisper to */
		var strlength = res[0].length + res[1].length + res[2].length + res[3].length + 4;
		OnWhisperTo(res[3], text.substring(strlength));
	} else if (res[0].toLowerCase() == "user" && res[1].toLowerCase() == "whisper" && res[2].toLowerCase() == "from") {
		/* user whisper from */
		var strlength = res[0].length + res[1].length + res[2].length + res[3].length + 4;
		OnWhisperFrom(res[3], text.substring(strlength));
	} else {
		console.log(datarecieved);
		NotificationMessage('3', datarecieved);
	}
}

/* came in from the sendtextbox */
function ProcessSendMessage(text) {
	if(text == undefined) { return; } //text is null
	if(text.length < 1) { return; } //no text in the buffer

	wsock.send(text + '\r\n');
}
