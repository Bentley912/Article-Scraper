var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var app = express();
var port = process.env.PORT || 8080;

//Scarping tools
var request = require("request");
var cheerio = require("cheerio");

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

//set up app

app.use(express.static(process.cwd() + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars.

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./routes/htmlRoutes");
app.use("/", routes);
app.listen(port);

// Database configuration with mongooseß
mongoose.connect("mongodb://localhost/articleScrape");
var db = mongoose.connection;
// Show any mongoose errors

db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

 module.exports = app;

