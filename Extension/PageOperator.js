console.log("Page Operator Running...");
var _currentTabId;
function startListener(){
	//sets and saves the _currentTab
	chrome.tabs.getCurrent(function(tab){_currentTabId = tab.id;
		//every time somehting is clicked on a pagethis exicutes
		document.addEventListener('click',(event)=>{
			sendMessageToBackground(createActionRecord(event));
		});
		document.addEventListener('keydown',(event)=>{
			console.log("keydown Event:",event);
		});



		//this is the reciver for commands given by the editor through the dispatcher.
		chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			handleRequest(request);
			//doFunction(request.command, request.objectInfo, request.parameter);  
		});
	});
};

function handleRequest(request)
{
	if(request.type == "preformAction")
	{
		prefromAction(request.info);
	}
}

function prefromAction(info)
{
	doAction(getElementByIdentity(info.identity),info.action);
}

//gets the element by what ever means necissary using the identity object.
function getElementByIdentity(identity)
{
	var elem = document.getElementById(identity.id);
	return elem;
}

function doAction(element, action)
{
	if(action == "click")
	{
		element.click();
	}
}


function createActionRecord(event)
{
	return {type:"action",
	info:{identity:getIdentity(event),tabId:_currentTabId,action:event.type}};
}

//this will gather all information about the object being acted upon. including the path and other infor
//for now its just the id for simplicity.
function getIdentity(event)
{
	return {id:event.target.id};
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


function sendMessageToBackground(object){
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
