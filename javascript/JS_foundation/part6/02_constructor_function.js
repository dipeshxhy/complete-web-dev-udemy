//

function Person(name, age) {
  this.name = name;
  this.age = age;
}

function Car(make, model) {
  this.make = make;
  this.model = model;
}

const person1 = new Person('Alice', 30);
const car1 = new Car('Toyota', 'Camry');

console.log(person1);
console.log(car1);

let myNewCar = new Car('Honda', 'Civic');
console.log(myNewCar);

function Tea(type) {
  this.type = type;
  this.describe = function () {
    return `this is a cup of ${this.type} tea.`;
  };
}
const greenTea = new Tea('green');
console.log(greenTea.describe());

function Animal(species) {
  this.species = species;
}
Animal.prototype.sound = function (sound) {
  return `${this.species} says ${sound}.`;
};
const dog = new Animal('dog');
console.log(dog.sound('Woof!'));

let cat = new Animal('cat');
console.log(cat.sound('Meow!'));

function Drink(name) {
  if (!new.target) {
    throw new Error('Drink must be called with new');
  }
  this.name = name;
}

let tea = new Drink('tea');
console.log(tea.name);
try {
  let coffee = Drink('coffee'); // This will throw an error because it's not called with 'new'
} catch (error) {
  console.error(error);
}
