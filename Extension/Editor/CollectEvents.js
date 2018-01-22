function populateEditor(request)
{
	//adds elements to list of elements and returns it.
	var elem = getStoredElement(request.info.identity);

	if(request.info.action == "click")
	{
		populateClick(elem.name);
	}
	// else if(request.info.action == "keydown")
	// {
	// 	populateKeyDown(elem.name,request.info.text)
	// }
}

function populateClick(name){
	var editorArea = document.getElementById("mainEditor");
	editorArea.value += "click("+name+");";
}

// function populateClick(name){
// 	var editorArea = document.getElementById("mainEditor");
// 	editorArea.value += "click("+name+");";
// }


// function populateKeyDown(name,text)
// {
// 	var editorArea = document.getElementById("mainEditor");
// 	editorArea.value += "SetTextOf("+name+")To(\""+text+"\");\r";
// }


// function populateEventInEditorArea(name,action)
// {
// 	var editorArea = document.getElementById("mainEditor");
// 	editorArea.value += "Preform("+action+")on("+name+");\r";
// }