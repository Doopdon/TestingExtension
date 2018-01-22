//Reads and runs the functions from the given command string.

function commandRunner(commandString)
{
  return commandRunnerRecurser(commandString,_commandTree,[]);
}

function commandRunnerRecurser(commandString,tree,params,terminators)
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
      var returnValue =  commandRunnerRecurser(commandString,_commandTree,[],tree["%"]);
      
      //plug the remainder of the command after this recursive function into the next recursive function
      //keep the same tree.
      console.log("function call return value",returnValue);
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
  else{
    if(terminators[char])
    {
      console.log("in final parameter return");
      return {remainder:commandString,value:""};
    }
    console.log("in the parameter thing");
    var returnValue = commandRunnerRecurser(remainder,[],[],terminators);
    return {remainder:returnValue.remainder,value:char+returnValue.value}
  }
}
