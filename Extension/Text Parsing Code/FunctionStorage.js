
//Adds given functions to the tree of functions.

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
