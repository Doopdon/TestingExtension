console.log("Page Operator Running...");


var _currentTabId;
function startListener(){
	//sets and saves the _currentTab
	chrome.tabs.getCurrent(function(tab){
		//set tab id for the current tab.
		_currentTabId = tab.id;
		//every time somehting is clicked on a page this executes
		document.addEventListener('click',(event)=>{
			handleClickEvent(event,sendMessageToDispatch);
		});
		document.addEventListener('contextmenu',(event)=>{
			handleContextMenu(event,sendMessageToDispatch);
		});

		//every time you hit a key this executes
		document.addEventListener('keydown',(event)=>{
			handleKeyDownEvent(event,sendMessageToDispatch);
		});

		//this is the reciver for commands given by the editor through the dispatcher.
		chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			handleRequest(request, sendResponse);
		});
	});
};

 $(document).ready(startListener);
