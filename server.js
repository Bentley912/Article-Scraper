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

 var result = [];
 
request("https://www.reddit.com/", function(error, response, html) {
  // Load the body of the HTML into cheerio
  var $ = cheerio.load(html);
  // Empty array to save our scraped data
 
  // With cheerio, find each h4-tag with the class "headline-link"
  $(".entry").each(function(i, element) {
    // Save the text of the h4-tag as "title"
    var title = $(this).text();
    // Find the h4 tag's parent a-tag, and save it's href value as "link"
    var link = $(element).children("a").text();
    // For each h4-tag, make an object with data we scraped and push it to the result array
    result.push({
      title: title,
      link: link
    });
  });
  // After the program scans each h4.headline-link, log the result
  
  console.log(result);
  return result;
});


module.exports = result;