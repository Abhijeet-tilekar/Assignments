let math = require("./mathOperation.js");
let express = require('express');
let app = express();
//let output = {home : true|false, response :'result'|'_err', result :[]};
app.get('/add/:firstNum/:secondNum',function(req,res){
    let add = math.add(req.params.firstNum,req.params.secondNum);
    res.status((add.status == 'OK') ? 200 : 500).json(add);
    console.log(add);
});
/*

app.get('/multiply/:firstNum/:secondNum',function(req,res){
    let multiply = math.multiply(req.params.firstNum,req.params.firstNum)
    if(multiply.err == 1){
        output.result  = multiply._err;
        output.response = '_err';
    }
    else{
        output.response = "result";
        output.result = multiply.result;
    }
    res.json(output);
});

app.get('/square/:Num',function(req,res){
    let square = math.square(req.params.Num)
    if(square.err == 1){
        output.result  = square._err;
        output.response = '_err';
    }
    else{
        output.response = "result";
        output.result = square.result;
    }
    res.json(output);
});

app.get('/squareRoot/:Num',function(req,res){
    let squareRoot = math.squareRoot(req.params.Num)
    if(squareRoot.err == 1){
        output.result  = squareRoot._err;
        output.response = '_err';
    }
    else{
        output.response = "result";
        output.result = squareRoot.result;
    }
    res.json(output);
});


app.get('/cube/:Num',function(req,res){
    let cube = math.cube(req.params.Num)
    if(cube.err == 1){
        output.result  = cube._err;
        output.response = '_err';
    }
    else{
        output.response = "result";
        output.result = cube.result;
    }
    res.json(output);
});
*/
app.listen("3000",function(){
    console.log('Server Running !!');
}); 