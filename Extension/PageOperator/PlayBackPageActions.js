function handleRequest(request, sendResponse)
{
	console.log("in handleRequest");
	if(request.type == "preformAction")
	{
		doAction(getElementFromIdentity(request.info.identity),request.info.action, request.info.value, sendResponse);
		//prefromAction(request.info, sendResponse);
	}
}

function doAction(element, action, value, sendResponse)
{
	console.log("in doAction");
	if(action.toUpperCase() == "Click".toUpperCase())
	{
		element.click();
	}
	if(action.toUpperCase() == "SetTextOf".toUpperCase())
	{
		element.value = value;
	}
	if(action.toUpperCase() == "rightClick".toUpperCase())
	{
		element.rightClick();
	}
	if(action.toUpperCase() == "Inspect".toUpperCase())
	{
		//console.log("has jquery",$("#btn1"));
		console.log("in Inspect",element.outerHTML);


		sendResponse(element.outerHTML)

		// //todo mek this take all kinds of values not just value
		// if(value.toUpperCase = "value".toUpperCase())
		// {
		// 	sendResponse(element.value);
		// }
	}
}