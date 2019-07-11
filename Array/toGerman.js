//Assignment 9
const RL = require("readline-sync");
function toGerman(input){
    const germanArray = ["null","eins","zwei","drei","vier","fünf","sechs","sieben","acht","neun","zehn"];
    return input.split(',').map(function(ele){
        return "The number "+ele+" is called "+germanArray[ele]+" in German";
    }).join("\n");
}
console.log(toGerman(RL.question("Enter Numbers (Seperated with , ) between 0-10 : \n")));
