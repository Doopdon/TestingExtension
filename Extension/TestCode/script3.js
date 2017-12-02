var _commandTree = {};

var _enclosingPairs = [];
  _enclosingPairs['('] = ')';
  _enclosingPairs['['] = ']';
  _enclosingPairs['{'] = '}';


function function3(){
  
   addCommandListToTree([{word:"a(%)a(%)a",funct:multiReturnerParam},{word:"a(%,%)a",funct:multiReturnerParam}]);//,{word:"abd",funct:testB},{word:"xxx", funct:standIn},{word:"acdc(%)",funct:testC}]);  
   setTimeout(function(){console.log(_commandTree);},500)
   setTimeout(function(){
     console.log("starting process Statment");
     //processStatment("a(a(a(a(a(x)))))");},2000);
   processStatment("a(a,b)a");},1000);
}

function processStatment(statment)
{
  console.log("testing...",findFunction(statment,_commandTree,[]));
}


//the statment could be 0 to many charachers long.
//the terminator destermines when the line exicutes.
function findFunction(statment, tree, params){
   console.log("start:",statment,tree);
   var char = statment[0];
   var remainder = statment.slice(1,statment.length);


    if(tree[char] && tree[char]["%"])
    {
      console.log("we need to find parameters");
      var rest = getEnclosedStament(remainder,char,tree[char]["%"]);
      console.log("rest of the statment:",rest);
      params.push(rest);
      return findFunction(remainder.slice(rest.length,remainder.length),tree[char]["%"],params);
    }
    else if(tree["funct"])
    {
      return tree["funct"](params);
    }
    else if(tree){
      return findFunction(remainder,tree[char],params);
    }


    // if(char == terminator){
    //   console.log("found terminator");
    //   return {terminated:true};
    // }
    // else if(tree && tree[char]){
    //   //do we have a function
    //   var functToRun = tree[char]["funct"];
    //   if(functToRun){
    //     //return "test worked";
    //     console.log("we found a function. remainder:",remainder);
    //     var retrnValue;

    //     //TODO do a check of somekind
    //     //does it start with "("?
    //     if(remainder[0] == "("){
    //       console.log("we have a '('");
    //       //we recursivly call, but this time we have found a function so reset the branch back to the root.
    //       retrnValue = findFunction(remainder.slice(1,remainder.length),_commandTree,")");
    //       console.log("result of looking for paramerters:",retrnValue);
    //     }
    //     var v =  functToRun(retrnValue.value.split(","))
    //     console.log("result of calling coresponding function:",v);
    //     return {terminated:true,value:v};
    //   }
    //   //we didnt find a function go to next char
    //   else
    //   {
    //     return findFunction(remainder,tree[char],terminator);
    //   }
      
    // }
    // //we have a value not a function
    // else{
    //   console.log("we got have a value not a function");
    //   tree = undefined
    //   //we have a new parameter
    //   if(char == ",")
    //   {
    //     console.log("we have a new parameter...remainder:",remainder);
    //     tree = _commandTree;
    //   }
      
    //   var res =  findFunction(remainder, tree,terminator);
    //   console.log("result of value recursive call:",res);
    //     if(res.terminated){
    //       if(!res.value){res.value = char
    //       }
    //       else{
    //         res.value = char+res.value;
    //       }
    //       console.log("result of adding character",res.value);
    //       return res;
    //     }
    // }


  // //see if it has a function to call and wheather the terminator indicates we SHOULD call it.
  // if(terminator && char == terminator)
  // {
  //   console.log("end of function");
  // }
  // else if(branch["funct"] && _terminatorPairs[remainder[0]])
  // {
  //   console.log("found Function:", branch["funct"]);
  //   //params = findFunction(remainder,_terminatorPairs[remainder[0]],_commandTree);
  // }
  // else{
  //   findFunction(remainder,branch,terminator);
  // }
}



//adding stuff to the tree

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
  console.log("this is the paramer, param:",param[0]);
}

function reterner()
{
  console.log("reterner");
  return true;
}

function returnerParam(param)
{
  param = param[0];
  console.log("returnerParam:",param);
  return param;
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

// function addWordsToList(stringArray)
// {
//   console.log(stringArray);
//   //for(var i = 0; i < 1; i++)
//   {
//     console.log("array part:",stringArray[0]);
//     addWordToList(stringArray[0],wordTree);
//   }
// }

// function addWordToList(word,tree)
// {
//   console.log("addWordToList",word,tree);
//   firstChar = word[0];
//   restOfWord = word.slice(1,word.length+1);
//   if(!tree[firstChar]){tree[firstChar] = [];}
//   if(restOfWord.length != 0){
//     addWordsToList(restOfWord,tree[firstChar]);}
// }

function getEnclosedStament(statment,encloser,tree)
{
  var seporators = tree.keys();
  console.log("seporators",seporators);

  var numEnclosedStatment = 1;
  var enclosedStament = "";
  var charToLookFor = _enclosingPairs[encloser];
  for(var i = 0; i < statment.length; i++)
  {
    if(statment[i] == encloser)
    {
      numEnclosedStatment++;
      enclosedStament+=statment[i];
    }
    else if(statment[i] == charToLookFor)
    {
      numEnclosedStatment--;
      if(numEnclosedStatment == 0){
        return enclosedStament;
      }
      else{
        enclosedStament+=statment[i];
      }
    }
    else{
      enclosedStament+=statment[i];
    }
  }
}



