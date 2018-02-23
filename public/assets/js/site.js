$(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
  });


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
              var card =$("<div>");
              var cardStack = $("<div>");
              var cardContent = $("<div>");
              var cardAction = $("<div>")
              var form = $("<form>");
              var panel = $("<div>");
              var heading = $("<p>")
              var input1 = $("<input>");
              var input2 =$("<input>")
              well.addClass("col s12 m4 l4");
              card.addClass("card horizontal red lighten-3")
              cardStack.addClass("card-stacked");
              cardContent.addClass("card-content");
              cardAction.addClass("card-action");
              form.addClass('articleSubmit')
              form.attr({
                            action:"/saved", 
                            method: "POST",
                            name: "article",
                        });
              input1.attr({
                type:"hidden",
                name: "title",
                value:response[i].title
              });
              input2.addClass("btn btn-large waves-effect waves-light")
              input2.attr("type", "submit");
              //ADD PREVENT DEFAULT FOR BUTTON CLICK 
              input2.html("Save Article");
            //   console.log(headingText);
              heading.append( '<strong>TITLE: </strong>' + response[i].title);
              form.append(input1);
              form.append(input2);
              cardAction.append(form);
              cardContent.append(heading);
              cardStack.append(cardContent);
              cardStack.append(cardAction);
              card.append(cardStack);
              well.append(card);
            //   panel.append(heading);
            //   well.append(panel);
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

$(".deleteButton").on('click', function(){ 
    var delete_id = this.parentElement.getAttribute('data-id');
    console.log(delete_id);
    $.ajax({
        method: "DELETE",
        url: "/articles/" + delete_id
    }).done(function(res){
        console.log(res);
    }).catch(function(err){     
        console.log(err);
    })

    this.parentElement.parentElement.remove();
})


$(document).on('submit', '.articleSubmit', function (e) { 
    e.preventDefault;
    console.log('Button Submitted Fool');
});


//submit event handler on form 
//input type equal submit for button 
//when submitting form use event prevent default 