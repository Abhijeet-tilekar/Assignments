//Assignment 8
const RL = require('readline-sync');

function allCube(input){
    return input.split(',').map(function(ele){
        return ele*ele*ele;
    }).join(",");
}
console.log(allCube(RL.question("Enter Numbers seperated by , : \n")))