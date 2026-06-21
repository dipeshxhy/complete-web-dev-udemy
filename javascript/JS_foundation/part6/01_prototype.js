let computer = { cpu: 12 };
let lenovo = { screen: 'HD', __proto__: computer };
let tomHardware = {};

console.log(lenovo.cpu);

const genericCar = {
  tyres: 4,
};
const tesla = {
  driver: 'AI',
};
Object.setPrototypeOf(tesla, genericCar);
console.log(tesla.tyres);
console.log(Object.getPrototypeOf(tesla));
