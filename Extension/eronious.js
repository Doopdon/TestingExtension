function hey()
{
	alert("hey");
}

function startListeners()
{
	chrome.runtime.onMessage.addListener(
	  function(request, sender, sendResponse) {
	    console.log("working?:",request);
	  });
}

function playBack()
{
	console.log("playing");
	sendMessageToBackground({command:"play",message:{tabId:"a", command:"openUrl",objectInfo:"oi",parameter:"https://www.reddit.com"}});

	setTimeout(function(){ 
		sendMessageToBackground({command:"play",message:{tabId:"a", command:"click",objectInfo:{id:"header-img"},parameter:null}}); 
	}, 2000);

}


function sendMessageToBackground(object){
	chrome.extension.sendMessage(object);
}


document.addEventListener('DOMContentLoaded', () => {

  var button = document.getElementById('button');
  button.addEventListener('click', () => {
    playBack();
  });

  startListeners();

});