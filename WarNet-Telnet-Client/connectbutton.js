/* connect button */

/* did we hit the disconnect button */
var selfdisconnected = false;

function OnClick_btnConnect(evt) {
	//if($("#apikey").val() == "") { 
	//	NotificationMessage('error', 'Your API key is not present (enter your key and try again).');
	//	return;
	//}
	//apiKey = $("#apikey").val();

	if(btnConnect.defaultValue == "Disconnect")
	{
		selfdisconnected = true;
		btnConnect.defaultValue = "Connect";
		wsock.close();
		return;
	}
	if(btnConnect.defaultValue == "Connect")
	{
		btnConnect.defaultValue = "Disconnect";
		ConnectWebSocket();
		return;
	}
}