
function goToEditor()
{
  chrome.tabs.create({ url: "../Editor/Editor.html" });
}

function goToTestUrl()
{
  chrome.tabs.create({url: "../PlayGround/PlayGround.html"});
}

function turnOnInvestigateMode(callback)
{
  callback()
}

function isInvestigationOn()
{
  return false;
}

var isInvestOn = false;

document.addEventListener('DOMContentLoaded', () => {

  var button = document.getElementById('button');
  var button2 = document.getElementById('button2');
  
 
  button.addEventListener('click', () => {
    goToEditor();
  });

  button2.addEventListener('click', () => {
    goToTestUrl();
    //turnOnInvestigateMode(function(){button2.innerHTML = "investigate mode on";})
  });

});
