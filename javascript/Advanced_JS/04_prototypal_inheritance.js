function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.greet = function () {
  console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
};
const alice = new Person('Alice', 30);
alice.greet(); // Hello, my name is Alice and I am 30 years old.

function Employee(name, age, position) {
  Person.call(this, name, age);
  this.position = position;
}
Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;
Employee.prototype.work = function () {
  console.log(`${this.name} is working as a ${this.position}.`);
};
const bob = new Employee('Bob', 25, 'Developer');
bob.greet(); // Hello, my name is Bob and I am 25 years old.
bob.work(); // Bob is working as a Developer.
