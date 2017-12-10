console.log("Page Operator Running...");


var _currentTabId;
function startListener(){
	//sets and saves the _currentTab
	chrome.tabs.getCurrent(function(tab){
		//set tab id for the current tab.
		_currentTabId = tab.id;
		//every time somehting is clicked on a pagethis exicutes
		document.addEventListener('click',(event)=>{
			handleClickEvent(event,sendMessageToDispatch);
		});
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

function handleRequest(request, sendResponse)
{
	if(request.type == "preformAction")
	{
		doAction(getElementFromIdentity(request.info.identity),request.info.action, request.info.value, sendResponse);
		//prefromAction(request.info, sendResponse);
	}
}

// function prefromAction(info, sendResponse)
// {
// 	doAction(getElementFromIdentity(info.identity),info.action, info.value, sendResponse);
// }



//gets the element by what ever means necissary using the identity object.
// function getElementByIdentity(identity)
// {
// 	var elem = document.getElementById(identity.id);
// 	return elem;
// }

function doAction(element, action, value, sendResponse)
{
	if(action.toUpperCase() == "Click".toUpperCase())
	{
		element.click();
	}
	if(action.toUpperCase() == "SetTextOf".toUpperCase())
	{
		element.value = value;
	}
	if(action.toUpperCase() == "Inspect".toUpperCase())
	{
		//todo mek this take all kinds of values not just value
		if(value.toUpperCase = "value".toUpperCase())
		{
			sendResponse(element.value);
		}
	}
}

var time;
function handleKeyDownEvent(event,callback)
{ 
	var timeOffset = 1000
	time = Date.now()
	setTimeout(function(){
		if(Date.now()-time>timeOffset-5)
		{
			var t = {type:"action",info:{identity:getIdentityFromElement(event.target),tabId:_currentTabId,action:event.type,text:event.srcElement.value}};
			callback(t);
		}
	},timeOffset+5);
}

function handleClickEvent(event,callback)
{
	var t = {type:"action",
	info:{identity:getIdentityFromElement(event.target),tabId:_currentTabId,action:event.type}};
	callback(t);
}


function doFunction(command, objectInfo , parameter)
{
	if(command === "click")
	{	
		if(objectInfo.id)//check to make sure we have the id before we use it.
		{
			document.getElementById(objectInfo.id).click();
		}
	}
}


function sendMessageToDispatch(object){
	chrome.extension.sendMessage(object);
}

function getReleventInfo(event)
{
	//console.log(event.target.innerHTML);

	var objInfo = {command:"recordElement",
		type:"element",
	path:processPath(event.path),
	id:event.target.id,
	elementInfo:event.target.outerHTML}
	return objInfo;
}

function getObjectInfo(target)
{
	rtnObj = {};
	rtnObj.id = target.id;
	rtnObj.class = target.className;
	return rtnObj;
}

function processPath(path)
{
	var partPath = [];
 	var part = path[0];
	if("HTMLBodyElement|HTMLHtmlElement|HTMLHtmlElement|Window".includes(elemType(part)))
	{
		//do nothing for now
	}
	else
	{
		partPath.push(getObjectInfo(part));
		//console.log(partPath)
		path.splice(0, 1);
		partPath = partPath.concat(processPath(path));
	}
	return partPath;
}

// function logOutPath(path)
// {
// 	outputList =[];
// 	path.forEach(function(val)
// 	{
// 		outputList.push(elemType(val));
// 	});
// 	console.log(outputList);
// }


function elemType(elementObj)
{
	//"HTMLElement",
	//"HTMLDivElement",
	//"HTMLBodyElement",
	//"HTMLHtmlElement",
	//"HTMLHtmlElement", 
	//"Window"
	return elementObj.toString().split(" ")[1].split("]")[0];
}

$(document).ready(startListener);
