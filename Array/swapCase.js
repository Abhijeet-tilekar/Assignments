const RL = require("readline-sync");
function swapCase(input){
    return input.split('').map(function(ele){
        if(ele >= 'a' && ele <= 'z'){
            return ele.toUpperCase();
        }
        else{
            return ele.toLowerCase();
        }
    }).join("");
}
console.log(swapCase(RL.question("Enter String : \n")));