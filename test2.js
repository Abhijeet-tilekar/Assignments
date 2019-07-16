const express = require('express');
const math = require('./test3.js');
const app  = express();
const server = app.listen("3000",function(){
        console.log("App Listening ");
});

app.get('/',function(req,res){
    let number1 = parseFloat(req.param('number1'));
    let number2 = parseFloat(req.param('number2'));
    let sum = math.sum(number1,number2);
    if(sum == '-'){
        res.status(404).send("Addition Cannot be done ");
    }
    else{
    res.json({home : app.path() == '' ? true : false,response :{input :[number1,number2],output : sum}});
    }
});

app.get('/square',function(req,res){
    let number1 = parseFloat(req.param('number1'));
    let number2 = "2";//parseFloat(req.param('number2'));
    let square = math.square(number1);
    if(square == '-'){
        res.status(404).send("Square Cannot be done ");
    }
    else{
        
        res.json({home : app.path() == '' ? true : false,response :{input :[number1,number2],output : square}});
    }
});

app.get('/cube',function(req,res){
    let number1 = parseFloat(req.param('number1'));
    let number2 = "2";//parseFloat(req.param('number2'));
    let cube = math.cube(number1);
    //res.send("Addition : "+result);
    if(cube == '-'){
        res.status(404).send("Cube Cannot be done ");
    }
    else{
        res.json({home : app.path() == '' ? true : false,response :{input :[number1,number2],output : cube}});
    }
});

app.get('/squareRoot',function(req,res){
    let number1 = parseFloat(req.param('number1'));
    let number2 = "1/2";//parseFloat(req.param('number2'));
    let squareRoot = math.squareRoot(number1);
    //res.send("Addition : "+result);
    if(squareRoot == '-'){
        res.status(404).send("SquareRoot Cannot be done ");
    }
    else{
        res.json({home : app.path() == '' ? true : false,response :{input :[number1,number2],output : squareRoot}});
    }
});


