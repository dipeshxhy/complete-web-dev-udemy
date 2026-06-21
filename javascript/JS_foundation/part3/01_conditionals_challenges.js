let num1 = 10;
let num2 = 8;

console.log('starting of conditional');
if (num1 > num2) {
  console.log(`The ${num1} is greater than ${num2}`);
} else {
  console.log(`The ${num2} is greater than ${num1}`);
}

// console.log('Bottom of code');

// 2. checking if a string is equal to another user
let username = 'chai';
let anotherUsername = 'chai';

if (username === anotherUsername) {
  console.log('Usernames are same');
} else {
  console.log('Usernames are different');
}

// check if variable is number or not
let score = [10, 20, 30];
if (Array.isArray(score)) {
  console.log('Score is an array');
} else {
  console.log('Score is not an array');
}

// check if a boolean value is true or false
let isTeaReady = false;
if (isTeaReady) {
  console.log('Tea is ready');
} else {
  console.log('Tea is not ready');
}

// check array is empty or not
let myArray = [1, 2, 3];
if (myArray.length === 0) {
  console.log('Array is empty');
} else {
  console.log('Array is not empty');
  console.log(`there are elements: ${myArray.join(', ')}`);
}
