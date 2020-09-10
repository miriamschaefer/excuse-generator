'use strict';

const button = document.querySelector('.button');
const p = document.querySelector('.excuse');
const reset = document.querySelector('.reset');
const h1 = document.querySelector('.title');

const who = [
  'Bad Bunny',
  'El perro',
  'Mi abuela',
  'Mi prima segunda',
  'Una tortuga',
];
const action = ['lanzó', 'quemó', 'pintó', 'se comió', 'desmontó'];
const what = [
  'mis deberes',
  'mi teléfono',
  'mi ordenador',
  'mis ganas de vivir',
  'mi casa',
];
const when = [
  'mientras yo dormía',
  'ayer',
  'esta mañana',
  'el año pasado',
  'el mes pasado',
];
const how = [
  'sin que me diese cuenta',
  'suavemente',
  'despacito',
  'mientras comía cocido',
  'perreando',
];

const emoji = ['🥺', '👀', '😬', '😥', '😳'];
//Matches the random position generated by getRandom to each array and renders the excuse.

function getExcuse() {
  let sentenceParts = [who, action, what, how, when, emoji];
  let excuse = '';

  for (let item in sentenceParts) {
    excuse = excuse + getRandom(sentenceParts[item]) + ' ';
  }
  p.innerHTML = excuse;
  translator.translateEl([p]);
}

//Gets a random position in our array
function getRandom(elements) {
  let position = Math.floor(Math.random() * elements.length);
  return elements[position];
}

function resetP() {
  p.innerHTML = 'No te lo vas a creer, pero...';
  translator.translateEl([p]);
}

button.addEventListener('click', getExcuse);
reset.addEventListener('click', resetP);

// Translate all
const translator = new Trans(["6ee2b634b5mshf767aaa2e13c109p1cac46jsn5a04d9722717"]);
translator.listenLangSelector('lang', 'click');
translator.translateEl([h1, button, reset, p]);
