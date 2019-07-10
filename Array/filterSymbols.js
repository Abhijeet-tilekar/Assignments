const RL = require('readline-sync');
function filterSymbols(inp){
    var input = inp.split(",");
    return input.filter(function(ele){
    return (ele != 'null' && ele != 'undefined' && ele != 0)
    });
 }
 console.log(filterSymbols(RL.question("Enter No's" )));