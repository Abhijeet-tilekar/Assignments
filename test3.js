
function sum(firstNumber,secondNumber){
    if(/\d./.test(firstNumber) && /\d./.test(secondNumber)){
        return {firstNumber + secondNumber;
    }
    else{
        return '-';
    }
}

function power(firstNumber,secondNumber){
    if(/\d/.test(firstNumber) && /\d/.test(secondNumber)){
        return firstNumber ** secondNumber;
    }
    else{
        return '-';
    }
}
function squareRoot(number){
    if(/\d/.test(number)){
        return power(number,(1/2));
    }
    else{
        return '-';
    }
}

function cube(number){
    if(/\d/.test(number))
        return power(number,3);
    else    
        return '-';
}
function square(number){
    if(/\d/.test(number))
        return power(number,2);
    else    
        return '-';
}

module.exports = {
    squareRoot,square,sum
}