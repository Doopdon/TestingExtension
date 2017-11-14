document.addEventListener('DOMContentLoaded', () => {
  
    var button = document.getElementById('button');
    
  
    button.addEventListener('click', () => {
      update();
    });
  
    
  });
  


function update()
{
  document.getElementById("lbl1").innerHTML = document.getElementById("tx1").value;
  document.getElementById("lbl2").innerHTML = document.getElementById("tx2").value;
  document.getElementById("lbl3").innerHTML = document.getElementById("tx3").value;
}