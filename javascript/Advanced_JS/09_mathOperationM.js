export function mathOperationM(operation) {
  return function (a, b) {
    switch (operation) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        return a / b;
      default:
        throw new Error('Invalid operation');
    }
  };
}

export default function greet(name) {
  return `Hello, ${name}!`;
}
