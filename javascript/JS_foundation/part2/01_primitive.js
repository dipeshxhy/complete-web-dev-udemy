// Number

let balance = 120;
console.log(typeof balance);

let anotherBalance = new Number(120);
console.log(typeof anotherBalance);
console.log(anotherBalance);
console.log(anotherBalance + 10);

// boolean

let isActive = true;
let isReallyActive = new Boolean(true);
console.log(typeof isActive);
console.log(typeof isReallyActive);
console.log(isReallyActive);
console.log(isReallyActive && false);

// null & undefined
let firstName;
let lastName = null;
// console.log(firstName);
// console.log(typeof firstName);
// console.log(lastName);
// console.log(typeof lastName);

// string
let myString = 'Hello';
let myStringOne = 'Hola';
let username = 'dipesh';

let oldGreet = myStringOne + ' ' + username;
console.log(oldGreet);

let greetMsg = `${myString} ${username}`;

let demoOne = `Value is ${balance + 100}`;
console.log(greetMsg);
console.log(demoOne);

// Symbol
let sym1 = Symbol('id');
let sym2 = Symbol('id');
console.log(sym1 === sym2);
console.log(sym1.description);
console.log(sym1.valueOf() === sym1);
console.log(sym1.toString());

let sym3 = Symbol();
console.log(sym3.valueOf() === undefined);
