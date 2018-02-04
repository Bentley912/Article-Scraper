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
        //   console.log(queryURL);
        //   console.log(response);
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
              well.addClass("card  red lighten-3");
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
              //ADD PREVENT DEFAULT FOR BUTTON CLICK 
              button.html("Save Article");
              console.log(headingText);
              heading.append( '<strong>TITLE: </strong>' + response[i].title);
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

var articleId; //variable for article id 
$(document).on('click', '#articlePanel', function(){
    articleId = $(this).attr('data-id');//article id for each saved article for note
    //console.log(articleId);
})

//Posting note data to note creation route
$('#addNote').on('click', function(){
    data ={
        title: $('#noteTitle').val(),
        body: $('#noteBody').val()
    }
    $.ajax({
        method: "POST",
        url: "/articles/" + articleId,
        data: {
            id: articleId,
            // Value taken from title input
            title: data.title,
            // Value taken from note textarea
            body: data.body
        }
    })
    // With that done
    .done(function (data) {
        // Log the response
        console.log(data);
    
    });
})

$('.getNotes').on('click', function(){
    $.ajax({
        method: "GET",
        url: "/articles/" + articleId
    }).done(function(data){
        //CHECK TO SEE IF NOTE EXISTS ON THE ARTICLE
        //IF NOTE DOESNT EXIST, LET THE USER KNOW
        if (typeof data.note === "undefined"){
            console.log('the property is not available...'); // print into console
        }
        console.log(data.note.title);
    }).catch(function(err){
        console.log(err)
    })
})






