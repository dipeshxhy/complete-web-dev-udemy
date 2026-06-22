const person = {
  name: 'Hitesh',
  age: 30,
  greet: function () {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old.`,
    );
  },
};

person.gr;
const greetFun = person.greet;
// detached head
greetFun(); // Hello, my name is undefined and I am 30 years old.

// call, apply,bind
greetFun.call(person);
