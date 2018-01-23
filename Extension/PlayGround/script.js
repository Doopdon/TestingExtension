document.addEventListener('DOMContentLoaded', () => {
  
    var button = document.getElementById('button');
    var btn1 = document.getElementById('btn1');
    var btn2 = document.getElementById('btn2');
    var btn3 = document.getElementById('btn3');
    button.addEventListener('click', () => {
      update();
    });

    btn1.addEventListener('click', () => {
      btnOne();
    });
    //rightClick
    btn1.addEventListener('contextmenu', () => {
      btnOneRightClick();
    });
    btn2.addEventListener('click', () => {
      btnTwo();
    });
    btn3.addEventListener('click', () => {
      btnThree();
    });

    
  });
  


function update()
{
  document.getElementById("lbl1").innerHTML = document.getElementById("tx1").value;
  document.getElementById("lbl2").innerHTML = document.getElementById("tx2").value;
  document.getElementById("lbl3").innerHTML = document.getElementById("tx3").value;
}

function btnOneRightClick()
{
  document.getElementById("lbl1").innerHTML = "-1";
}
function btnOne()
{
  document.getElementById("lbl1").innerHTML = "1";
}
function btnTwo()
{
  document.getElementById("lbl2").innerHTML = "2";
}
function btnThree()
{
  document.getElementById("lbl3").innerHTML = "3";
}