$(".scrape").on("click", function(event) {
      event.preventDefault();
      scrapeQuery();
      $("#noneDiv").hide();
//grab data from api/scrape   
})


function scrapeQuery(){
    queryURL = "/api/scrape";
    $.ajax({ url: queryURL, method: "GET" })
        // After data comes back from the request
        .done(function(response) {
          console.log(queryURL);
          console.log(response);
          for (var i =0; i <response.length; i++){
              console.log("Div!!");
              var panel = $("<div>");
              var heading = $("<div>")
              var headingText = $("<h3>");
              panel.addClass("panel panel-primary");
              heading.addClass("panel-heading");
              headingText.addClass("panel-title");
              headingText.html(response[i].title);
              heading.append(headingText);
              panel.append(heading);
              $("#panelSection").append(panel);
          }
        })
};



