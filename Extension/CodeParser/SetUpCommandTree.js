var _commandTree = [];

var defaultCommands = [
    {word:"click(%)",funct:click},
    {word:"rightClick(%)",funct:rightClick},
    {word:"hover(%)",funct:hover},
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

function rightClick(identity){
    console.log("click function");
}

function hover(identity){
    console.log("click function");
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
    console.log("click function");
}

function pressKey(identity,key,callback){
    console.log("click function");
}

function runScript(script,callback){
    console.log("click function");
}

function initializeTree(){
    console.log("initializing");
    addCommandListToTree(defaultCommands);
    console.log("tree",_commandTree);
}