var express = require('express');
var router = express.Router();
var request = require("request");
var cheerio = require("cheerio");
var result = require("../server.js");
var Note = require("../models/Note.js");
var Article = require("../models/Article.js");

router.get("/", function(req,res){   
  res.render('index');  
});

router.get("/saved", function(req,res){   
  res.send("Saved Articles Page");  
});
// Route for scraping data from Reddit
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
        // console.log(result);
        res.json(result);      
    });
    
})

router.get("/api/scrape", function(req,res){
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
        // console.log(result);
        res.json(result);      
    });   
})

//Route for saving an article 
router.post("/saved", function(req,res){
    var entry = new Article(
        {
            title:req.body.title
        });
    entry.save(function(err, doc) {
        // Log any errors
        if (err) {
          console.log(err);
        }
        // Or log the doc
        else {
          console.log(doc);
        }
      });
      res.render('index');
});

//Route for finding saved articles
router.get("/articles", function(req, res) {
  Article.find({}, function(error,doc){
    if (error){
      res.send(error)
    }
    else{
      res.render("saved", { contents: doc}) 
    }
  });
});

router.delete("/articles/:id", function(req,res){
    Article.remove({"_id": req.params.id})
    .exec (function(err, doc){
        if (err){
            console.log(err)
            res.send(err)
        } 
        res.send(doc)
        })
})

router.get('/articles/:id', function(req, res) {
    Article.findOne({"_id":req.params.id})
    .populate('note')
    .exec(function(err,doc){
        if (err){
            res.send(err)
            console.log(err)
        }
        else{
            res.send(doc) 
        }
    })
});

router.post("/articles/:id", function(req, res) {
//need to find on with "_id: req.params.id"
var newNote = new Note(req.body);

    newNote.save(function(err,data){
        if (err){
            console.log(err);
        }
        else{
            Article.update({"_id": req.body.id}, {$set: {note:data.id} }, {new:true})
            .exec(function(err,data){
            if (err){
                res.send(err)
            }
            else{
                res.send(data)
            }
            });
        }
    })
})

module.exports = router; 