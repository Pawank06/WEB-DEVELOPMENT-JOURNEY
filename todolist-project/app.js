const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
// const { urlencoded } = require("body-parser");
// const date = require(__dirname + "/date.js");

// console.log(date());

const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

mongoose.connect('mongodb://127.0.0.1:27017/todolistDB');
const itemsSchema = {
    name: String
};

const Item =  mongoose.model("Item", itemsSchema);

const item1 = new Item ({
    name: "Welcome to your to-do list!"
});
const item2 = new Item ({
    name: "Click the + button to add a new item."
});
const item3 = new Item ({
    name: "<-- Hit this to delete an item."
});

const defaultItems = [item1,item2,item3];
// Item.insertMany(defaultItems)
//       .then(function () {
//         console.log("Successfully saved defult items to DB");
//       })
//       .catch(function (err) {
//         console.log(err);
//       });

app.get("/", function(req, res){

    

    Item.find({})
      .then(function (foundItems) {
        if (foundItems == 0) {
            Item.insertMany(defaultItems)
                .then(function () {
                 console.log("Successfully saved defult items to DB");
            })
            .catch(function (err) {
              console.log(err);
            }); 
            res.redirect("/");
        }
        else{
            res.render("list", {listTitle: "Today", newListItems: foundItems});
        }
      })
      .catch(function (err) {
        console.log(err);
      });

    
    

    

});

app.post("/", function(req,res){

    const itemName = req.body.newItem;
    const item = new Item({
        name: itemName
    });

    item.save();
    res.redirect("/");

    

});

app.get("/work", function(req,res){

    res.render("list", {listTitle: "Work List",newListItems: workItems });

});

// app.post("/work", function(req, res){

    
//     let item = req.body.newItem;
//     workItems.push(item);
//     res.redirect("/work")
// });

app.listen(3000, function(){
    console.log("Server running on port 3000");
});