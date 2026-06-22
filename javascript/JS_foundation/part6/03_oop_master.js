let car = {
  make: 'Toyota',
  model: 'Camry',
  year: 2020,
  start: function () {
    console.log('The car has started.');
    return `${this.make} car got started in ${this.year}`;
  },
  stop: function () {
    console.log('The car has stopped.');
  },
};
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.greet = function () {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old.`,
    );
  };
}
let person1 = new Person('Alice', 30);
let person2 = new Person('Bob', 25);
person1.greet();
person2.greet();
console.log(car.start());
car.stop();

function Animal(type) {
  this.type = type;
}
Animal.prototype.makeSound = function () {
  console.log(`The ${this.type} makes a sound.`);
};
let dog = new Animal('dog');
let cat = new Animal('cat');
dog.makeSound();
cat.makeSound();

Array.prototype.sum = function () {
  return this.reduce((acc, val) => acc + val, 0);
};
let numbers = [1, 2, 3, 4, 5];
console.log(numbers.sum());

class Vehicle {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }
  start() {
    console.log('The vehicle has started.');
  }
  stop() {
    console.log('The vehicle has stopped.');
  }
}
class Car extends Vehicle {
  constructor(make, model, year, doors) {
    super(make, model, year);
    this.doors = doors;
  }
  honk() {
    console.log('The car is honking.');
  }
  drive() {
    return `The ${this.make} ${this.model}  is driving.`;
  }
}
let myCar = new Car('Honda', 'Civic', 2021, 4);
// myCar.start();
// myCar.honk();
// myCar.stop();
console.log(myCar.drive());

// let vehicleOne = Vehicle('Ford', 'Mustang');

// Encapsulation
class BankAccount {
  #balance = 0;
  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
      console.log(`Deposited: $${amount}`);
    } else {
      console.log('Deposit amount must be positive.');
    }
  }
  withdraw(amount) {
    if (amount > 0 && amount <= this.#balance) {
      this.#balance -= amount;
      console.log(`Withdrew: $${amount}`);
    } else {
      console.log('Invalid withdrawal amount.');
    }
  }
  getBalance() {
    return `$${this.#balance}`;
  }
}
let myAccount = new BankAccount();
myAccount.deposit(100);
myAccount.withdraw(30);
console.log(myAccount.getBalance());

// Abstraction
class Shape {
  constructor(name) {
    this.name = name;
  }
  area() {
    throw new Error('Method "area()" must be implemented.');
  }
}
class Circle extends Shape {
  constructor(radius) {
    super('Circle');
    this.radius = radius;
  }
  area() {
    return Math.PI * this.radius ** 2;
  }
}
class Rectangle extends Shape {
  constructor(width, height) {
    super('Rectangle');
    this.width = width;
    this.height = height;
  }
  area() {
    return this.width * this.height;
  }
}
let circle = new Circle(5);
let rectangle = new Rectangle(4, 6);
console.log(`Area of ${circle.name}: ${circle.area()}`);
console.log(`Area of ${rectangle.name}: ${rectangle.area()}`);

class Employee {
  #_salary;
  constructor(name, salary) {
    this.name = name;
    if (salary > 0) {
      this.#_salary = salary;
    } else {
      console.log('Salary must be positive. Setting salary to 0.');
      this.#_salary = 0;
    }
  }
  get salary() {
    return this.#_salary;
  }
  set salary(amount) {
    if (amount > 0) {
      this.#_salary = amount;
    } else {
      console.log('Salary must be positive.');
    }
  }
}
let employee = new Employee('John Doe', -50000);
console.log(employee.salary);
employee.salary = 60000;
console.log(employee.salary);
employee.salary = -1000; // Invalid salary
