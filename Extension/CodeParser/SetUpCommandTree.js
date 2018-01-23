var _commandTree = [];

var defaultCommands = [
    {word:"click(%)",funct:click},
    {word:"contextMenu(%)",funct:contextMenu},
    {word:"hover(%)",funct:hover},
    {word:"pause(%)",funct:pause},
    {word:"inspect(%)",funct:inspect},
    {word:"enterValue(%,%)",funct:enterValue},
    {word:"pressKey(%,%)",funct:pressKey},
    {word:"runScript(%,%)",funct:runScript}
];


function click(idName){
    var elem = getElement(idName)

    sendMessageToDispatcher({type:"preformAction",
							info:{tabId:elem.tabId,
								identity:elem.identity,
								action:'click'}});

    console.log("click function");
}

function contextMenu(idName){
    var elem = getElement(idName)

    sendMessageToDispatcher({type:"preformAction",
							info:{tabId:elem.tabId,
								identity:elem.identity,
								action:'contextmenu'}});

    console.log("context menu");
}

function hover(identity){
    console.log("click function");
}

function pause(time){
    console.log("in pause function");
}

function inspect(idName){
    console.log("in code Parser, SetupCommandTree inspect funciton");
    var elem = getElement(idName)

    var thing = function(reply){console.log("reply:",reply)}

    sendMessageToDispatcher({type:"preformAction",
							info:{tabId:elem.tabId,
                                identity:elem.identity,
                                action:'inspect'}},
                            thing);
}

function enterValue(identity,value,callback){
    console.log("incomplete function");
}

function pressKey(identity,key,callback){
    console.log("incomplete function");
}

function runScript(script,callback){
    console.log("incomplete function");
}

function initializeTree(){
    addCommandListToTree(defaultCommands);
}