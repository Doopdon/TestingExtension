function handleRequest(request, sendResponse)
{
	if(request.type == "preformAction")
	{
		doAction(getElementFromIdentity(request.info.identity),request.info.action, request.info.value, sendResponse);
		//prefromAction(request.info, sendResponse);
	}
}

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