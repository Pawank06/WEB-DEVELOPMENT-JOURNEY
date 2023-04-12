const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const _ = require("lodash");
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

const listSchema = {
    name: String,
    items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);

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

// Dynamic name


app.post("/", function(req,res){

    const itemName = req.body.newItem;
    const listName = req.body.list;

    const item = new Item({
        name: itemName
    });

    if(listName == "Today"){
        item.save();
    res.redirect("/");    
    }

    else{
        List.findOne({name: listName})
        .then(function(foundList){
            foundList.items.push(item);
            foundList.save();
            res.redirect("/" + listName);
        })
    }

    

    

});

app.get("/:customListName", function(req,res){


    const customListName = _.capitalize(req.params.customListName);
    List.findOne({name: customListName}).exec()
    .then(foundList => {
        if (!foundList) {
            const list = new List({
                name: customListName,
                items: defaultItems
            })
         
            list.save();
            res.redirect("/" + customListName);
        } else {
            res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
        }
    })
    .catch(err => {
        console.error(err);
    });

    
    // .then(function(foundList){
    //     if(!foundList){
    //         console.log("Doesn't exist");
    //     }
    //     else{
    //         console.log("exist");
    //     }
    // })

    // .catch(function(err){
    //     console.log(err);
    // })
        
    

    
    

});

app.post("/delete", function(req,res){
    const checkedItemId  = req.body.checkbox;
    const listName = req.body.listName;

    if(listName === "Today"){
        Item.findByIdAndRemove(checkedItemId)
        .then(function(){
            console.log("Success");
            res.redirect("/");
        })
        .catch(function(err){
            console.log(err); 
        })
    }
    else{
        List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}})
        .then(function(foundList){
            if(foundList){
                res.redirect("/" + listName);
            }
        })
        .catch(function(err){
            if(err){
                console.log(err);
            }
        })
    }

    

});



// app.post("/work", function(req, res){

    
//     let item = req.body.newItem;
//     workItems.push(item);
//     res.redirect("/work")
// });

app.listen(3000, function(){
    console.log("Server running on port 3000");
});


// ChatGpt
// List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList){
//             if(!err){
//                 res.redirect("/" + listName);
//             }
//         })