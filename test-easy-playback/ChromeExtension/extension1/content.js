var gan = JSON.parse(window.localStorage.getItem('person')) || {
  name: 'gan',
  age: 12
};
console.log(gan.name + ' is ' + gan.age);
gan.age += 1;
window.localStorage.setItem('person', JSON.stringify(gan));
console.log(document);
console.log('fuck');
