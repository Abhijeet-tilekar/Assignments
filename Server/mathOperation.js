let response_format= () => ({"status": "OK"|"NOT_OK", 
                "errors" : [], 
                "output" : {"operation" :null,"input" :[],"result" : null}
            })
let noValidation = (number) => { 
    return (/^\d*\.?\d*$/.test(number)) ? 0 : {err_code : 1000,description: "Not A Number"};  
}

 let floatValidation = (number) =>{
    return (/\d./.test(number)) ? {err_code : 1001,description: "Float Number"} : 0;
 }

 let negValidation = (number) =>{
    return (Math.abs(number) == number) ? 0 : {err_code : 1002,description: "Negative Number"};  
 }

let add = (firstNum,SecondNum) => {
    let response = response_format();
    let errs = []
    if(noValidation(firstNum) != 0 || (noValidation(SecondNum) != 0)){
        response.status = "NOT_OK";
        if(noValidation(firstNum) != 0){errs.push(noValidation(firstNum))};
        if(noValidation(SecondNum) != 0){errs.push(noValidation(SecondNum))};
    }
    else{
        response.status = "OK";
        response.output.operation = firstNum + " + " + SecondNum;
        response.output.input.push(firstNum,SecondNum);
        response.output.result = parseFloat(firstNum) + parseFloat(SecondNum);
    }
    response.errors = errs;
    return response;
}

let multiply = (firstNum,SecondNum) => {
    let response = response_format();
    let errs = []
    if(noValidation(firstNum) != 0 || (noValidation(SecondNum) != 0)){
        response.status = "NOT_OK";
        if(noValidation(firstNum) != 0){errs.push(noValidation(firstNum))};
        if(noValidation(SecondNum) != 0){errs.push(noValidation(SecondNum))};
    }
    else{
        response.status = "OK";
        response.output.operation = firstNum + " * " + SecondNum;
        response.output.input.push(firstNum,SecondNum);
        response.output.result = parseFloat(firstNum) * parseFloat(SecondNum);
    }
    response.errors = errs;
    return response;
}

let power = (firstNum,SecondNum) => {
    let response = response_format();
    let errs = []
    if(noValidation(firstNum) != 0 || (noValidation(SecondNum) != 0) || (floatValidation(SecondNum) != 0)){
        response.status = "NOT_OK";
        if(noValidation(firstNum) != 0){errs.push(noValidation(firstNum))};
        if(noValidation(SecondNum) != 0){errs.push(noValidation(SecondNum))};
        if(floatValidation(SecondNum) != 0){errs.push(floatValidation(SecondNum))};
    }
    else{
        response.status = "OK";
        response.output.operation = firstNum + " ^ " + SecondNum;
        response.output.input.push(firstNum,SecondNum);
        response.output.result = parseInt(firstNum) ** parseInt(SecondNum);
    }
    response.errors = errs;
    return response;
}

let squareRoot = (number) => {
    let response = response_format();
    let errs = []
    if(noValidation(number) != 0 || (negValidation(number) != 0) || (floatValidation(number) != 0)){
        response.status = "NOT_OK";
        if(noValidation(number) != 0){errs.push(noValidation(number))};
        if(negValidation(number) != 0){errs.push(negValidation(number))};
        if(floatValidation(number) != 0){errs.push(floatValidation(number))};
    }
    else{
        response.status = "OK";
        response.output.operation = "Square Root of "+number;
        response.output.input.push(number);
        response.output.result = parseInt(number) ** (1/2);
    }
    response.errors = errs;
    return response;
}

let square = (number) => {
    let response = response_format();
    let errs = []
    if(noValidation(number) != 0){
        response.status = "NOT_OK";
        if(noValidation(number) != 0){errs.push(noValidation(number))};
    }
    else{
        response.status = "OK";
        response.output.operation = number + "s Square ";
        response.output.input.push(number);
        response.output.result = parseInt(number) ** 2;
    }
    response.errors = errs;
    return response;
}

let cube = (number) => {
    let response = response_format();
    let errs = []
    if(noValidation(number) != 0){
        response.status = "NOT_OK";
        if(noValidation(number) != 0){errs.push(noValidation(number))};
    }
    else{
        response.status = "OK";
        response.output.operation = number + "s Square ";
        response.output.input.push(number);
        response.output.result = parseFloat(number) ** 3;
     }
     response.errors = errs;
    return response;
}

console.log(response_format());
module.exports = {add, multiply, square, squareRoot, cube};