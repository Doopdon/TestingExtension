function populateEditor(request)
{
	//adds elements to list of elements and returns it.
	var elem = getStoredElement(request.info.identity);

	if(request.info.action == "click")
	{
		populateEventInEditorArea(elem.name,request.info.action)
	}
	else if(request.info.action == "keydown")
	{
		populateKeyDown(elem.name,request.info.text)
	}
}

function populateKeyDown(name,text)
{
	var editorArea = document.getElementById("mainEditor");
	editorArea.value += "SetTextOf("+name+")To(\""+text+"\");\r";
}


function populateEventInEditorArea(name,action)
{
	var editorArea = document.getElementById("mainEditor");
	editorArea.value += "Preform("+action+")on("+name+");\r";
}