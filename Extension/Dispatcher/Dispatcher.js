console.log("Background application is running...")


var PlaybackTabs = [];

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("in onMessage.addListener. request:",request,"sender",sender,"sendResponse",sendResponse);
    if(request.type == "preformAction")
    {
      console.log("sendResponse:",request,sender, sendResponse);
          runAction(request,sendResponse);
    }
    else{
        findEidtor(function(tab){
          chrome.tabs.sendMessage(tab.id,request);
        });
    }
  }
);

function runAction(request)
{
  console.log("in runAction");
  findTab(request.info.tabId,function(tab){
    chrome.tabs.sendMessage(tab.id,request);
  })
}


function startPlayingTab(message)
{
  if(message.command === "openUrl")
  {
    chrome.tabs.create({ url: message.parameter},
      function(tab){
        PlaybackTabs[message.tabId] = tab.id; 
      });
  }
  else if(message.command === "click")
  {
    findTab(PlaybackTabs[message.tabId],function(tab){
      chrome.tabs.sendMessage(tab.id,{command:"click", objectInfo:message.objectInfo});

    })
  }

  
}

function findTab(tabId, callback)
{
  chrome.windows.getAll({populate : true}, function (windowList) {
    for(let i = 0; i < windowList.length; i++)
    {
      chrome.tabs.getAllInWindow(windowList[i].id, theTabs = function(tabs){
        for(let j=0; j < tabs.length; j++)
        {
          if(tabs[j].id === tabId)
          {
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
    for(let i = 0; i < windowList.length; i++)
    {
      chrome.tabs.getAllInWindow(windowList[i].id, theTabs = function(tabs){
        for(let j=0; j < tabs.length; j++)
        {
          if(tabs[j].title === "Editor")
          {
            callback(tabs[j]);
          }
        }
      });
    }
  });
}