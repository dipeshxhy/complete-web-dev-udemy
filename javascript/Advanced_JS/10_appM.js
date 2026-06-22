import { mathOperationM } from './09_mathOperationM.js';
import greet from './09_mathOperationM.js';
const add = mathOperationM('+');
const subtract = mathOperationM('-');
const multiply = mathOperationM('*');
const divide = mathOperationM('/');

console.log(add(5, 3));
console.log(subtract(5, 3));
console.log(multiply(5, 3));
console.log(divide(5, 3));

console.log(greet('Hitesh'));
