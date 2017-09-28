var elementsList = [
  `<button className="1" id="1">button 1</button>`,
  `<button className="2" id="2">button 2</button>`,
  `<button className="3" id="3">button 3</button>`,
  `<button className="4" id="4">button 4</button>`,
  `<button className="5" id="5">button 5</button>`,
  `<button className="6" id="6">button 6</button>`
];

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

$(document).ready(function() {
  elementsList = shuffleArray(elementsList);
  elementsList.forEach(button => {
    $('body').append(button);
  });
  $('button').on('click', function() {
    $(this).css({ 'background-color': 'blue' });
  });

  $('button').hover(function() {
    $(this).css({ 'background-color': 'red' });
  });
});
