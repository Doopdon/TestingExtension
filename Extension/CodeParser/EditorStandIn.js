//Stands in for the Editor, also holds the commandTree object



function f()
{
  addCommandListToTree([
    {word:"a(%)",funct:returnerParam2}
    ,{word:"a(%)b",funct:returnerParam}
    //,{word:"ab%e",funct:standIn}
  ]);
    console.log(_commandTree);
    console.log("result of a",commandRunner("a(a(x))b"))
    //console.log("result of a",commandRunner("ab"))
}

