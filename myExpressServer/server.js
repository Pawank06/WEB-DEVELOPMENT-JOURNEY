const express = require("express");
const app =express();

app.get("/", function(request, response){
    response.send("<h1>Hello world</h1>");
});

app.get("/about",function(req,res){
    res.send("Hey everyone my name is pawan and I am a web developer");
});

app.get("/contact", function(req,res2){
    res2.send("contact me at @pawan06kumar@gmail.com");
});

app.get("/file", function(req,res){
    res.send("hey I am file");
});

app.get("/file2", function(req,res){
    res.send("hey I am file");
});

app.get("/file3", function(req,res){
    res.send("hey I am file");
});

app.get("/file7", function(req,res){
    res.send("hey I am file");
});

app.get("/file11", function(req,res){
    res.send("hey I am file");
});

app.listen(3000, function(){
    console.log("Server started on 3000 port");
});