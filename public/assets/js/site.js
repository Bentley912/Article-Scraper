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
              var well = $("<div>");
              var form = $("<form>");
              var panel = $("<div>");
              var heading = $("<div>")
              var headingText = $("<h3>");
              var button = $("<button>");
              var input1 = $("<input>");
              var input2 = $("<input>");
              well.addClass("well well-lg");
              panel.addClass("panel panel-primary");
              heading.addClass("panel-heading");
              headingText.addClass("panel-title");
              form.attr({
                            action:"/saved", 
                            method: "POST",
                            name: "article"
                        });
              input1.attr({
                type:"hidden",
                name: "title",
                value:response[i].title
              });
              button.addClass("btn btn-sm btn-success pull-right")
              button.attr("type", "submit");
              button.html("Save Article");
              headingText.html(response[i].title);
              heading.append(headingText);
              heading.append(button);
              form.append(input1);
              form.append(button);
              panel.append(form);
              panel.append(heading);
              well.append(panel);
              $("#panelSection").append(well);
          }
    })
};



