const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extends:true}));

app.get("/bmicalculator", function(req, res){
    res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmicalculator", function(req, res){
    var weight = req.body.weight;
    var height = req.body.height;
    
    var bmiResult = weight/height;
    
    if(bmiResult<=18){
        res.send("You are under weight your BMI is "+bmiResult);
    }
    else if(bmiResult>18 && bmiResult<=24){
        res.send("you are normal your BMI is "+bmiResult);
    }
    else if(bmiResult>24 && bmiResult<=29){
        res.send("you are overweighted your BMI is "+bmiResult);
    }
    else{
        res.send("you are a obesity patient");
    }
});

app.listen(3000, function(){
    console.log("Server started on post 3000");
})