// console.log('heloo chai');
console.log('chai');

/**
 *
 * Data types in JavaScript:
 * - primitive types:
 *  - number: 42, 3.14, -0.5
 *  - string: 'hello', "world", `template literals`
 *  - boolean: true, false
 *  - null: represents the intentional absence of any object value
 *  - undefined: represents an uninitialized variable or a missing value
 *  - symbol: a unique and immutable primitive value used as a key for object properties
 *  - bigint: represents integers with arbitrary precision (e.g., 9007199254740991n)
 *
 * - non-primitive types:
 *  - object: { name: 'Chai', age: 2 }
 *  - array: [1, 2, 3, 'hello']
 *  - function: function greet() { console.log('Hello!'); }
 *  - date: new Date()
 *  - regex: /pattern/
 *
 * JavaScript is a dynamically typed language, which means that variables can hold values of any type and the type can change at runtime.
 */
let score = 102;
let name = 'Chai';
let isActive = true;
// object
let teaType = ['Green', 'Black', 'Oolong', 'White'];
let user = {
  name: 'Chai',
  age: 2,
  breed: 'Siamese',
  isActive: true,
};

let duplicateScore = score; // duplicateSore is a copy of score, both are independent

console.log(duplicateScore);
console.log(user);
