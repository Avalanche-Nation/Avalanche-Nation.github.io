/* init and global data */


function init()
{
	loggedname = username;
	
	channeltitle = document.getElementById("main-channel-title");
	channeltitle.innerText = "";
	output = document.getElementById("main-chat");
	btnConnect = document.getElementById("con-button");
	btnConnect.onclick = function(evt) { OnClick_btnConnect(evt) };
	btnConnect.defaultValue = "Connect";
	btnSend = document.getElementById("command-button");
	btnSend.onclick = function(evt) { OnClick_btnSend(evt) }
	staticCommandInput = document.getElementById("command-input");
	staticCommandInput.onkeypress = function(evt) { OnKeyPressed_staticCommandInput(evt) }

	/* init config */
	initFormData();
}
	
		
//window.addEventListener("load", init(), false);