var _commandTree = [];

var defaultCommands = [
    {word:"click(%)",funct:click}
];


function click(){
    Console.log("click function");
}

function initializeTree(){
    console.log("initializing");
    addCommandListToTree(defaultCommands);
    console.log("tree",_commandTree);
}