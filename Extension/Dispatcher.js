console.log("Background application is running...")


var PlaybackTabs = [];

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	console.log("this is the request:",request);
    if(request.type === "preformAction")
    {
          console.log("preformAction:",request);
          // startPlayingTab(request.message);
          // return;
    }
    else{

        // var parser = new DOMParser();
        // var doc = parser.parseFromString(request.elementInfo, "text/html");
        // console.log(doc);
        findEidtor(function(tab){
          chrome.tabs.sendMessage(tab.id,request);
        });
    }
    //chrome.tabs.sendMessage(findEidtor().id,request);
  });



function startPlayingTab(message)
{
  if(message.command === "openUrl")
  {
    chrome.tabs.create({ url: message.parameter},
      function(tab){
        console.log("tab info:",tab);
        PlaybackTabs[message.tabId] = tab.id; 
      });
  }
  else if(message.command === "click")
  {
    console.log("message", message);
    console.log("PlaybackTabs", PlaybackTabs);

    findTab(PlaybackTabs[message.tabId],function(tab){
      console.log("sending message", tab.id,"message",message);
      chrome.tabs.sendMessage(tab.id,{command:"click", objectInfo:message.objectInfo});

    })

    console.log("click");
  }

  
}


// setTimeout(function(){
// 	var windowList;
// 	chrome.windows.getAll({populate : true}, function (window_list) {
//         //console.log("windows",window_list);
//         windowList = window_list;

//         console.log(windowList);
//         chrome.tabs.getAllInWindow(windowList[0].id,function(tabs){
//           console.log("tabs",tabs)
//         	chrome.tabs.sendMessage(tabs[1].id,{command:"command", message:"sentit"});
//     	});
//     });


	
// 	console.log("windows ",chrome.windows);

//     //chrome.tabs.sendMessage(tab.id,{action:"SendIt"});
// },10000 );

// 
function findTab(tabId, callback)
{
  console.log(tabId);
  chrome.windows.getAll({populate : true}, function (windowList) {
    console.log("windowList:",windowList);
    for(let i = 0; i < windowList.length; i++)
    {
      chrome.tabs.getAllInWindow(windowList[i].id, theTabs = function(tabs){
        console.log("tabs:",tabs);
        for(let j=0; j < tabs.length; j++)
        {
          if(tabs[j].id === tabId)
          {
            console.log("found Tab");
            callback(tabs[j]);
            return;
          }
        }
      });
    }
  });
}


function findEidtor(callback)
{
  chrome.windows.getAll({populate : true}, function (windowList) {
    console.log("windowList:",windowList);
    for(let i = 0; i < windowList.length; i++)
    {
      chrome.tabs.getAllInWindow(windowList[i].id, theTabs = function(tabs){
        console.log("tabs:",tabs);
        for(let j=0; j < tabs.length; j++)
        {
          if(tabs[j].title === "Editor")
          {
            console.log("the tab",tabs[j]);
            callback(tabs[j]);
          }
        }
      });
    }
  });
}