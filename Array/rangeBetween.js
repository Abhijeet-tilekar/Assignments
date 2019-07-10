const RL = require('readline-sync');
function rangeBetween(no1,no2){
    var start = no1;
    var out = [];
    while(start <= no2){
       out.push(start);
       start++;
    }
    return out;
 }

 var no1 = RL.question('Enter start no  : \n');
 var no2 = RL.question('Enter end no : \n');
 console.log("No's between"+no1+" to "+no2+": \n");
 console.log(rangeBetween(no1,no2));
 