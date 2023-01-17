/* SendText and the Send Button related to it */

/* send button */
function OnClick_btnSend(evt) {
	var text = $("#command-input").val();
	if(text == "") { return; } //empty message dont send.
	$("#command-input").val("");
	if(connected == false) { return; } //were not connected.
	ProcessSendMessage(text);
}

/* key press */
function OnKeyPressed_staticCommandInput(evt) {
	if(evt["key"] == "Enter") { //then send the message
		var text = $("#command-input").val();
		if(text == "") { return; } //empty message dont send.
		$("#command-input").val("");
		if(connected == false) { return; } //were not connected.
		ProcessSendMessage(text);
	}
}