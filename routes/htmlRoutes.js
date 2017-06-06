var express = require('express');
var router = express.Router();
var request = require("request");
var cheerio = require("cheerio");
var result = require("../server.js");

router.get("/", function(req,res){   
  res.render('index');  
});

router.get("/saved", function(req,res){   
  res.send("Saved Articles Page");  
});

router.post("/api/scrape", function(req,res){
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
        res.json(result);      
    });
    
})
//TODO: fix scrape to populate json page
//TODO: Route for Creating 


module.exports = router; 