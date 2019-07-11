const RL = require('readline-sync');
//Assignment 10
function countLetters(input){
    var total_cnt = input.split('').reduce((cnt,ele) => {
        if(!cnt[ele]){
            cnt[ele] = 1;
        }
        else{
            cnt[ele] += 1;
        }
        return cnt;
    },{});
    return total_cnt;
}

console.log(countLetters(RL.question("Enter String : \n")));
