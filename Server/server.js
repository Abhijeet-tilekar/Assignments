let math = require("./mathOperation.js");
let express = require('express');
let app = express();

app.get('/add/:firstNum/:secondNum',function(req,res){
    let add = math.add(req.params.firstNum,req.params.secondNum);
    res.status((add.status == 'OK') ? 200 : 500).json(add);
    console.log(add);
});

app.get('/multiply/:firstNum/:secondNum',function(req,res){
    let multiply = math.multiply(req.params.firstNum,req.params.secondNum);
    res.status((multiply.status == 'OK') ? 200 : 500).json(multiply);
    console.log(multiply);
});

app.get('/square/:Num/',function(req,res){
    let square = math.square(req.params.Num);
    res.status((square.status == 'OK') ? 200 : 500).json(square);
});

app.get('/cube/:Num/',function(req,res){
    let cube = math.cube(req.params.Num);
    res.status((cube.status == 'OK') ? 200 : 500).json(cube);
});

app.get('/squareRoot/:Num/',function(req,res){
    let squareRoot = math.squareRoot(req.params.Num);
    res.status((squareRoot.status == 'OK') ? 200 : 500).json(squareRoot);
});

app.listen("3000",function(){
    console.log('Server Running !!');
}); 