
function startListeners()
{
	var button = document.getElementById('button');
	button.addEventListener('click', () => {
	  playBack();
	});

	chrome.runtime.onMessage.addListener(
	  	function(request, sender, sendResponse) {  
		if(!sender.url)
		{
			if(request.type == "action")
			{
				populateEditor(request);
			}
		}
	});
}

function sendMessageToDispatcher(object,response){
	chrome.extension.sendMessage(object,response);
}

document.addEventListener('DOMContentLoaded', () => {
  startListeners();
});