
//Play Back Functionality
function playBack()
{
	var mainEditor = document.getElementById("mainEditor");
	var commands = mainEditor.value.split(";");
	runCommand(commands,0)
	
	//runCommands(0,commands,0);
}

function runCommand(commands,index){
	var res = commandRunner(commands[index]);
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
	if(commandParts[0].toUpperCase() == "Preform".toUpperCase())
	{
		preformAction(commandParts[1],commandParts[3]);		
	}
	else if(commandParts[0].toUpperCase() == "SetTextOf".toUpperCase())
	{
		preformAction("SetTextOf",commandParts[1],commandParts[3]);
	}
	else if(commandParts[0].toUpperCase() == "Wait".toUpperCase())
	{
		//this will return the amount of time in seconds that should be watied
		return commandParts[1]*1000;
	}
	else if(commandParts[0].toUpperCase() == "Inspect".toUpperCase())
	{
		preformAction("Inspect",commandParts[1],commandParts[3], 
		function(reply){console.log("reply from page:",reply)});
	}
	return 100;
}

function getElement(name)
{
	var element;
	for(var i = 0; i < _elements.length; i++)
	{
		if(_elements[i].name == name)
		{
			return _elements[i];
		}
	}
}

function preformAction(action,name,value,response)
{
	console.log("prefroming action...")
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
								action:action,
								value:value}},response);
}







//god fucking damn it javascript
function replaceAll(initialString, stringToReplace, stringToReplaceWith)
{	
   for(i = 0; i < initialString.length; i++) {
	initialString = initialString.replace(stringToReplace, stringToReplaceWith);
   }
   return initialString;
}



