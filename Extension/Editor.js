var _elements = [];
function startListeners()
{
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

function populateEditor(request)
{	var elem = populateElements(request.info.identity);
	if(elem)
	{
		populateEventInEditorArea(elem.name,request.info.action)
	}
}


function populateEventInEditorArea(name,action)
{
	var editorArea = document.getElementById("mainEditor");
	editorArea.value += "Preform("+action+")on("+name+");\r";
}

//stand in unique name for elements
var _name = 1;
function populateElements(identity)
{
	var storageElem = document.getElementById("elements");	
	try{
		_elements = JSON.parse(storageElem.value);
	}
	catch(e)
	{
		_elements = [];
	}
	
	for(var i = 0; i < _elements.length; i++)
	{
		if(compareIdentities(_elements[i].identity,identity))
		{
			
			return _elements[i];
		}
	}
	
	var newElem = {name:(_name++).toString(),identity:identity};
	_elements.push(newElem);
	storageElem.textContent = JSON.stringify(_elements);

	return newElem;
}

function compareIdentities(id1, id2)
{
	if(id1.id != id2.id)
	{
		return false;
	}

	return true;

}

function addElement(name, id, elemToAddTo)
{
	elemToAddTo.textContent+="{name:"+name+",id:"+id+"}\r\r";
}

function playBack()
{
	var mainEditor = document.getElementById("mainEditor");
	var commands = mainEditor.value.split(";");
	runCommands(0,commands,0);
}

function runCommands(timeout,commands,index)
{
	setTimeout(function()
	{
		if(commands[index].trim() != "")
		{
			var time = doCommand(commands[index]);
			runCommands(time,commands,index+1)
		}
	},timeout);
}




function doCommand(command)
{
	//cleans up command so its usable.
	command = command.trim();
	command = replaceAll(command,'(','|');
	command = replaceAll(command,')','|');
	var commandParts = command.split('|');
	
	//determines type of command
	if(commandParts[0].toUpperCase() == "PREFORM")
	{
		preformAction(commandParts[1],commandParts[3]);		
	}
	else if(commandParts[0].toUpperCase() == "WAIT")
	{
		//this will return the amount of time in seconds that should be watied
		return commandParts[1]*1000;
	}

	return 10;
}

function preformAction(action,name)
{
	var element;
	for(var i = 0; i < _elements.length; i++)
	{
		
		if(_elements[i].name == name)
		{
			element = _elements[i];
			i = _elements.length;
		}
	}
	sendMessageToDispatcher({type:"preformAction",
							info:{tabId:element.tabId,
								identity:element.identity,
								action:action}});
}

//god fucking damn it javascript
function replaceAll(initialString, stringToReplace, stringToReplaceWith)
{	
   for(i = 0; i < initialString.length; i++) {
	initialString = initialString.replace(stringToReplace, stringToReplaceWith);
   }
   return initialString;
}


function sendMessageToDispatcher(object){
	chrome.extension.sendMessage(object);
}


document.addEventListener('DOMContentLoaded', () => {

  var button = document.getElementById('button');
  button.addEventListener('click', () => {
    playBack();
  });

  startListeners();

});