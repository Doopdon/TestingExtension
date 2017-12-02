
var _commandTree = [];
function f()
{
  addCommandListToTree([
    {word:"a()",funct:returner}
    ,{word:"a(%)b",funct:returnerParam}
    //,{word:"ab%e",funct:standIn}
  ]);
    console.log(_commandTree);
    console.log("result of a",commandRunner("a(a())b"))
    //console.log("result of a",commandRunner("ab"))
}


function commandRunner(commandString)
{
  return commandRunnerRecurser(commandString,_commandTree,[]);
}

function commandRunnerRecurser(commandString,tree,params)
{
  console.log("info:",commandString,tree);
  var char = commandString[0];
  var remainder = commandString.slice(1,commandString.length);
  

  //is this point potentialy for a parameter
  if(tree["%"])
  {
    
    //is the next char part of a function therefor not a function
    if(tree[char])
    {
      return commandRunnerRecurser(remainder,tree[char],params);
    }
    else{ //find the parameter
      
      //start over. find a new function this corresponds to, use the root as the tree.
      var returnValue =  commandRunnerRecurser(commandString,_commandTree,[]);
      
      //plug the remainder of the command after this recursive function into the next recursive function
      //keep the same tree.
      
      params.push(returnValue.value);
      return commandRunnerRecurser(returnValue.remainder,tree["%"],params)
    }
  }
  else if(tree[char])
  {
    
    return commandRunnerRecurser(remainder,tree[char],params);
  }
  else if(tree["funct"])
  {
    console.log("running fuction");
    return {remainder:commandString,value:tree["funct"](params)};
  }
}

// function commandRunnerRecurser(commandString,tree)
// {
//   console.log("start");
//   var char = commandString[0];
//   var remainder = commandString.slice(1,commandString.length);
  
//   //if we are at the end of a command string and it cant be another string.
//   console.log("remainder:",remainder)
//   if(tree[char]["funct"] && !tree[remainder[0]])
//   {
//     consol.log("in function")
//     var returnValue = {};
//     returnValue.value = tree[char]["funct"]();
//     returnValue.remainder = remainder;
//     return returnValue;
//   }
//   else if(tree["%"])
//   {
//     console.log("in % part");
//     var returnValue = commandRunnerRecurser(remainder,_commandTree);
//     console.log("return value:",returnValue);
//     commandRunnerRecurser(returnValue.remainder,tree[char])
//     //start over
//   }
//   else if(tree[char]){
//     commandRunnerRecurser(remainder,tree[char])
//   }
// }

function addCommandListToTree(commandArray){
  //console.log("array:",commandArray);
  for(var i = 0; i < commandArray.length; i++){
    //console.log("string "+i+":",commandArray[i]);
    addWordToList(commandArray[i].word,commandArray[i].funct,_commandTree);
  }
}

function addWordToList(word,funct,tree)
{
  var char = word[0];
  var remainder = word.slice(1,word.length);

  //console.log(char,remainder,word,tree);
  if(!tree[char]){
    tree[char] = [];
    //console.log("add list");
  }

  if(remainder.length != 0){
  addWordToList(remainder,funct,tree[char]);}
  else{
     tree[char]["funct"] = funct;
  }  
}

function standIn()
{
  console.log("Stand In");
}

function paramer(param)
{
  console.log("running function 'paramer', param:",param[0]);
}

function returner()
{
  console.log("running function 'reterner'");
  return "hey";
}

function returnerFalse()
{
  console.log("running function 'returnerFalse'");
  return false;
}

function returnerParam(param)
{
  param = param[0];
  console.log("running function 'returnerParam' param:",param);
  return param+" baby";
}

function multiReturnerParam(params)
{
  console.log("multiReturnerParam:",params);
  return params[0]+params[1];
}

function testA()
{
  console.log("Test function A");
}

function testB()
{
  console.log("Test function B");
}

function testC(param)
{
  console.log("Test function C, param:",param);
}



