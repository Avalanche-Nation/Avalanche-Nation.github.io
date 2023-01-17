/* everything needed for the userlisting - must be above the channelname script */

/* clear the userlisting */
function clearuserlisting() {
	var myNode = document.getElementById("userlisting");
	while (myNode.firstChild) {
		myNode.removeChild(myNode.firstChild);
	}
}

function removeuser(namein) {
	var $elementidvalue = 'thisuser-' + namein;
	//NotificationMessage('userleftchannel', $elementidvalue);
	document.getElementById($elementidvalue).remove();
}

function updateuser(namein, game, flag, ping) {
	var elementidvalue = 'thisuser-' + namein;
	document.getElementById(elementidvalue).remove();

    var pre = document.createElement("li");
    pre.setAttribute('id', 'thisuser-' + namein);
    pre.setAttribute('class', $IconFlagIdString(flag, game));
	
    var usernamepar = document.createElement("p");
	usernamepar.setAttribute('class', 'icon-em');
	usernamepar.setAttribute('id', $PingFlagIdString(ping, flag));
    usernamepar.innerText = namein;

	pre.appendChild(usernamepar);

	userlisting.appendChild(pre);
}

function AddUser(namein, game, flag, ping) {
    var pre = document.createElement("li");
    pre.setAttribute('id', 'thisuser-' + namein);
    pre.setAttribute('class', $IconFlagIdString(flag, game));
	
    var usernamepar = document.createElement("p");
	usernamepar.setAttribute('class', 'icon-em');
	usernamepar.setAttribute('id', $PingFlagIdString(ping, flag));
    usernamepar.innerText = namein;


    pre.appendChild(usernamepar);

    userlisting.appendChild(pre);
}

//Userlist Icon to use from the .CSS
function $IconIdString(gamestring) {
    if(gamestring == 'STAR') { return "icon-starcraft"; }
    if(gamestring == 'SEXP') { return "icon-broodwars"; }
	if(gamestring == 'SSHR') { return "icon-starcraftsw"; }
    if(gamestring == 'CHAT') { return "icon-chat"; }
    if(gamestring == 'D2DV') { return "icon-diablo2"; }
    if(gamestring == 'D2XP') { return "icon-diablo2lod"; }
    if(gamestring == 'DRTL') { return "icon-diablo1"; }
    if(gamestring == 'DSHR') { return "icon-diablo1sw"; }
    if(gamestring == 'JSTR') { return "icon-starcraftj"; }
    if(gamestring == 'W2BN') { return "icon-warcraft2"; }
    if(gamestring == 'WAR3') { return "icon-warcraft3"; }
    if(gamestring == 'W3XP') { return "icon-warcraft3tft"; }
	/* init6 */
    if(gamestring == 'RATS') { return "icon-starcraft"; }
    if(gamestring == 'PXES') { return "icon-broodwars"; }
	if(gamestring == 'RHSS') { return "icon-starcraftsw"; }
    if(gamestring == 'TAHC') { return "icon-chat"; }
    if(gamestring == 'VD2D') { return "icon-diablo2"; }
    if(gamestring == 'PX2D') { return "icon-diablo2lod"; }
    if(gamestring == 'LTRD') { return "icon-diablo1"; }
    if(gamestring == 'RHSD') { return "icon-diablo1sw"; }
    if(gamestring == 'RTSJ') { return "icon-starcraftj"; }
    if(gamestring == 'NB2W') { return "icon-warcraft2"; }
    if(gamestring == '3RAW') { return "icon-warcraft3"; }
    if(gamestring == 'PX3W') { return "icon-warcraft3tft"; }	
    return "icon-unknowen";
}

//Userlist Flag Icon to use from the .CSS
function $IconFlagIdString(flag, gamestring) {
	if(flag == 0) { return $IconIdString(gamestring); }
	if((flag & 0x2) == 0x2) { return "icon-moderator"; }
	
	/* check this flag last ping icon flag */
	if((flag & 0x10) == 0x10) { return $IconIdString(gamestring); }
    NotificationMessage('warning', 'Unknowen/unimplemented flag [' + flag + ']');
    return $IconIdString(gamestring);
}

//Userlist ping icon and plug flag.
function $PingFlagIdString(ping, flag) {
	if((flag & 0x10) == 0x10) { return "icon-plug"; }
	//NotificationMessage('warning', ping);
	if((ping >=   0) && (ping <= 200)) { return "icon-one"; }
	if((ping >= 201) && (ping <= 300)) { return "icon-two"; }
	if((ping >= 301) && (ping <= 400)) { return "icon-three"; }
	if((ping >= 401) && (ping <= 500)) { return "icon-four"; }
	if((ping >= 501) && (ping <= 600)) { return "icon-five"; }
	if( ping >= 601) { return "icon-six"; }
	
	return "icon-unknowen";
}
