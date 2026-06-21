function greet(name) {
  console.log(`Hello, ${name}!`);
}
greet('Alice');
greet('dipesh');

function makeTea(typeOfTea) {
  return `Making ${typeOfTea}`;
}
const teaOrder = makeTea('green tea');
// console.log(teaOrder);

//2.

function orderTea(teaType) {
  function confirmOrder() {
    return `Order for ${teaType} confirmed!`;
  }
  return confirmOrder();
}

const order1 = orderTea('oolong tea');
// console.log(order1);

// 3 arrow fun
const calculateTotal = (price, quantity) => price * quantity;
const totalCost = calculateTotal(100, 10);
console.log(totalCost);

// 4.
function processTeaOrder(makeTea) {
  return makeTea('earl grey');
}
const result = processTeaOrder(function (teaType) {
  return `Processing order for ${teaType}`;
});
console.log(result);

// 5
function createTeaMaker() {
  return function (teaType) {
    return `Making ${teaType}`;
  };
}
const teaMaker = createTeaMaker();
const teaResult = teaMaker('herbal tea');
console.log(teaResult);
