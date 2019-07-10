const RL = require('readline-sync');
function contains(arr,element){
    return arr.includes(element);
}
var arr = RL.question("Enter Array separted with , : \n").split(",");
console.log(arr);
console.log(contains(arr,RL.question("Enter element to check : \n")));