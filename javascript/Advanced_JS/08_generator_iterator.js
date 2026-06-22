function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}
console.log(numberGenerator().next()); // { value: 1, done: false }
const gen = numberGenerator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }

const iterable = {
  name: 'Iterable Object',

  *[Symbol.iterator]() {
    yield this.name;
    yield 'World';
  },
};
for (const value of iterable) {
  console.log(value);
}
