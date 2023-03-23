const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require('https');

const app = express();

https.createServer(function(req, res) {});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(req,res){

    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.ename;
    
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_feild:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us11.api.mailchimp.com/3.0/lists/fba8c7adc7";

    const Options = {
        method: "POST",
        auth: "pawan1:5b188bbea2c94222105c735291ea0970-us11"
    }

    const request = https.request(url, Options, function(response){
        
        if(response.statusCode == 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
        
        
        
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();

});

app.post("/failure", function(req,res){

    res.sendFile(__dirname + "/signup.html")

});

app.listen(3000,function(){
    console.log("Server running on port 3000");
});

//  API KEY
// 2df2746af8b680bb2daee9a30e44d19d-us11

// 5b188bbea2c94222105c735291ea0970-us11

// AUDIENCE ID
// fba8c7adc7