const username = {
  first_name: 'Dipesh',
  last_name: 'Chaudhary',
  isLoggedIn: true,
};

// const myFirstname = 'dipesh';
// myFirstname = 'dipesh1';

// console.log(myFirstname);

console.log(username);
console.log(typeof username);

username.first_name = 'Dinesh';
console.log(username.first_name);
console.log(username.last_name);
console.log(username);

username['good character'] = true;
console.log(username['good character']);

let today = new Date();
console.log(today);
console.log(today.toDateString());
console.log(today.toISOString());
// Array
let heroes = ['Superman', 'Batman', 'Hulk'];
let anotherUser = ['dipesh', 'chaudhary', true];
console.log(anotherUser[0]);
console.log(anotherUser.at(-2));
console.log(anotherUser.length);

// type conversion
console.log(1 + '1');
console.log(10 * '20');
console.log(0.1 + 0.2);
let isValue = true;
console.log(isValue + 1);

console.log(Number(null) + 10);
