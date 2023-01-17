/* Extra functions */

//Time stamp Chat Window
function $TimeStamp() {
	var d = new Date();
	var $ts = d.toLocaleTimeString();
	if($ts.length != 11)
	{
		return '[0' + $ts + ']';
	} else {
		return '[' + $ts + ']';
	}
}
	
//Statstring processor, Chat window
function $Statstring(gamestring) {
    if(gamestring == 'STAR') { return "Starcraft"; }
    if(gamestring == 'SEXP') { return "Starcraft Broodwars"; }
	if(gamestring == 'SSHR') { return "Starcraft Shareware"; }
    if(gamestring == 'CHAT') { return "Web Chat Client"; }
    if(gamestring == 'D2DV') { return "Diablo 2"; }
    if(gamestring == 'D2XP') { return "Diablo 2 Lords of Destruction"; }
    if(gamestring == 'DRTL') { return "Diablo Retail"; }
    if(gamestring == 'DSHR') { return "Diablo Shareware"; }
    if(gamestring == 'JSTR') { return "Starcraft Japan"; }
    if(gamestring == 'W2BN') { return "Warcraft 2 Battle.net Edition"; }
    if(gamestring == 'WAR3') { return "Warcraft 3 Rein of Chaos"; }
    if(gamestring == 'W3XP') { return "Warcraft 3 The Frozen Throne"; }
	/* init6 breaking protocols 1 client at a time */
    if(gamestring == 'RATS') { return "Starcraft"; }
    if(gamestring == 'PXES') { return "Starcraft Broodwars"; }
	if(gamestring == 'RHSS') { return "Starcraft Shareware"; }
    if(gamestring == 'TAHC') { return "Web Chat Client"; }
    if(gamestring == 'VD2D') { return "Diablo 2"; }
    if(gamestring == 'PX2D') { return "Diablo 2 Lords of Destruction"; }
    if(gamestring == 'LTRD') { return "Diablo Retail"; }
    if(gamestring == 'RHSD') { return "Diablo Shareware"; }
    if(gamestring == 'RTSJ') { return "Starcraft Japan"; }
    if(gamestring == 'NB2W') { return "Warcraft 2 Battle.net Edition"; }
    if(gamestring == '3RAW') { return "Warcraft 3 Rein of Chaos"; }
    if(gamestring == 'PX3W') { return "Warcraft 3 The Frozen Throne"; }
    return "Unknown Game Type [" + gamestring + "]";
}

/* basic chat window printing */ //Notification class id to use from the .CSS
function $NotificationMessageType(messagetypestring) {
	if(messagetypestring == 'self') { return "self-message"; }
	if(messagetypestring == '1' || messagetypestring == 'good') { return "good-message"; }
	if(messagetypestring == '2' || messagetypestring == 'warning') { return "warning-message"; }
	if(messagetypestring == '3' || messagetypestring == 'error') { return "bad-message"; }
	if(messagetypestring == '4') { return "emote-em-cls"; }
	if(messagetypestring == 'userinchannel') { return "userinchannel-message"; }
	if(messagetypestring == 'userjoinedchannel') { return "userjoinedchannel-message"; }
	if(messagetypestring == 'userleftchannel') { return "userleftchannel-message"; }
	return "icon-unknowen";
}
/* basic chat window printing */
function NotificationMessage(messagetype, messageout) {
	var pre = document.createElement("li");
	var partime = document.createElement("p");
	partime.setAttribute('class', 'timestamp-cls');
	partime.innerText = $TimeStamp();
	var par = document.createElement("p");
	par.innerText = messageout;
	par.setAttribute('class', $NotificationMessageType(messagetype));

	pre.appendChild(partime);
	pre.appendChild(par);
	messagelisting.appendChild(pre);
	output.scrollTop = output.scrollHeight;
}