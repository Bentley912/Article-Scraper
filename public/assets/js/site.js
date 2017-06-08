$(".scrape").on("click", function(event) {
      event.preventDefault();
      scrapeQuery();
      //hides original panel-warning div 
      $("#noneDiv").hide();

})


function scrapeQuery(){
    //grab data from api/scrape   
    queryURL = "/api/scrape";
    $.ajax({ url: queryURL, method: "GET" })
        // After data comes back from the request
        .done(function(response) {
          console.log(queryURL);
          console.log(response);
          for (var i =0; i <response.length; i++){
              //loop through results and add panels for each response 
              console.log("Div!!");
              var panel = $("<div>");
              var heading = $("<div>")
              var headingText = $("<h3>");
              var button = $("<button>");
              panel.addClass("panel panel-primary");
              heading.addClass("panel-heading");
              headingText.addClass("panel-title");
              button.addClass("btn btn-danger pull-right")
              button.html("Save Article");
              headingText.html(response[i].title);
              heading.append(headingText);
              panel.append(button);
              panel.append(heading);
              $("#panelSection").append(panel);
          }
    })
};



