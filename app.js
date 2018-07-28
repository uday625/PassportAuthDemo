var express = require("express");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/auth_demo_app");

var app = express();

app.set ('view engine', 'ejs');

//INDEX ROUTE
app.get("/", (req,res)=>{
    res.render("home");
});


//SECRECT ROUTE
app.get("/secret", (req,res)=>{
    res.render("secret");
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started...");
});