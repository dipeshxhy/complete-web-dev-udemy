// 1.accessing elements
const textElem = document.getElementById('myParagraph');
const changeButtonText = document.getElementById('changeTextButton');

changeButtonText.addEventListener('click', () => {
  textElem.textContent = 'Text has been changed!';
  textElem.style.color = 'salmon';
});

// 2. traversing dom
document.getElementById('highlightFirstCity').addEventListener('click', () => {
  const citiesList = document.getElementById('citiesList');
  const firstCity = citiesList.firstElementChild;
  firstCity.classList.add('highlight');
});

// 3.manipulating dom elements
document.getElementById('changeOrder').addEventListener('click', () => {
  const orderElem = document.getElementById('coffeeType');
  orderElem.textContent = 'Espresso';
  orderElem.style.fontSize = '24px';
  orderElem.style.color = 'brown';
});

const shoppingList = document.getElementById('shoppingList');
// 4. creating and removing elements
document.getElementById('addNewItem').addEventListener('click', () => {
  const newItem = document.createElement('li');
  newItem.textContent = 'Eggs 🥚';
  shoppingList.appendChild(newItem);
});

// 5.removing elements
const taskList = document.getElementById('taskList');
document.getElementById('removeLastTask').addEventListener('click', () => {
  if (taskList.lastElementChild) {
    taskList.removeChild(taskList.lastElementChild);
  }
});

// 6. Event Handling
document.getElementById('clickMeButton').addEventListener('mouseover', () => {
  alert('Button was hovered over!');
});

// 7. event delegation
const teaListElm = document.getElementById('teaList');
teaListElm.addEventListener('click', (e) => {
  console.log(e.target.textContent);
  const elem = e.target;
  console.dir(elem);
  if (elem && elem.tagName === 'LI') {
    elem.classList.toggle('highlight');
  }
});

// 8. form handling
const feedBackForm = document.getElementById('feedbackForm');
const feedBackDisplay = document.getElementById('feedbackDisplay');
feedBackForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const feedback = document.getElementById('feedbackInput').value;
  feedBackDisplay.textContent = feedback;
  feedBackForm.reset();
});

// 9. DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');
});

// 10. window load event
window.addEventListener('load', () => {
  console.log('All resources finished loading!');
});
// 11 css manipulation
document.getElementById('toggleHighlight').addEventListener('click', () => {
  const elem = document.getElementById('descriptionText');
  elem.classList.toggle('highlight');
});
