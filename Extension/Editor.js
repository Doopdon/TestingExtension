function hey()
{
	alert("hey");
}

function startListeners()
{
	chrome.runtime.onMessage.addListener(
	  function(request, sender, sendResponse) {
			console.log(request);
			populateEditor(request);
	  });
}

function populateEditor(request)
{	
	populateElements(request);
}


function populateElements(request)
{
	var elem = document.getElementById("elements");	
	if(!elem.textContent.includes("id:"+request.id))
	{
		elem.textContent+="{name:"+request.id+"\r";
		elem.textContent+="id:"+request.id+"}\r\r";
	}
}

function playBack()
{
	// console.log("playing");
	// sendMessageToBackground({command:"play",message:{tabId:"a", command:"openUrl",objectInfo:"oi",parameter:"https://www.reddit.com"}});

	// setTimeout(function(){ 
	// 	sendMessageToBackground({command:"play",message:{tabId:"a", command:"click",objectInfo:{id:"header-img"},parameter:null}}); 
	// }, 2000);

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