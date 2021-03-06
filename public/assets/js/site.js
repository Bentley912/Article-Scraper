$(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
    $(".button-collapse").sideNav();
  });

  $('.noteButton').on("click", function(){
    $('#modal1').modal('open');
  })

$(".scrape").on("click", function(event) {
      event.preventDefault();
      scrapeQuery();
      //hides original panel-warning div 
      $("#noneDiv").hide();
})

// THIS GETS SCRAPED DATA & CREATES PANELS AND CARDS FOR EACH INSTANCE IN DATA AND RENDERS TO PAGE
function scrapeQuery(){
    //grab data from api/scrape   
    queryURL = "/api/scrape";
    $.ajax({ url: queryURL, method: "GET" })
        // After data comes back from the request
        .done(function(response) {
        //   console.log(queryURL);
        //   console.log(response);
          for (var i =1; i <response.length; i++){
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
              well.addClass("col s12 m12 l12");
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
              input2.addClass("btn btn-large waves-effect waves-light buttonSubmit")
              input2.attr("type","submit");
              //ADD PREVENT DEFAULT FOR BUTTON CLICK 
              input2.html("Save Article");
            //   console.log(headingText);
              cardContent.append( '<strong>TITLE: </strong>' + response[i].title);
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

//SAVES ARTICLE ID FOR POSTING/EDITING NOTES FOR EACH ARTICLE
var articleId; //variable for article id 
$(document).on('click', '.articlePanel', function(){
    articleId = $(this).attr('data-id');//article id for each saved article for note
    console.log(articleId);
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
    .done(function () {
        // Close the Modal
        $('#modal1').modal('close');
    });
})

//AJAX CALL TO GET NOTES FOR A SPECIFIC ARTICLE 
$('.getNotes').on('click', function(){
    $.ajax({
        method: "GET",
        url: "/articles/" + articleId
    }).done(function(data){
        //CHECK TO SEE IF NOTE EXISTS ON THE ARTICLE
        //IF NOTE DOESNT EXIST, LET THE USER KNOW

        var noteDiv = $("[data-id=" + articleId + "]");

        if (typeof data.note === "undefined"){
            console.log('the property is not available...');
             // print into console
            noteDiv[1].append("This article has no Notes");
        }else{
            console.log(data);
            console.log(noteDiv[1]); 
            noteDiv[1].append(data.note.title);
            noteDiv[1].append(data.note.body);
        }
    }).catch(function(err){
        console.log(err)
    })
})


//AJAX CALL TO DELETE ARTICLES
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
//AJAX CALL TO SAVE ARTICLES
$(document).on('submit', '.articleSubmit', function (e) { 
    e.preventDefault();
    articleTitle = ((this).childNodes[0].value);
    var badge = $('<span>');
    badge.addClass('new badge red');
    badge.attr('data-badge-caption', 'Saved!');
    $(this).append(badge);
    
    data ={
        title: articleTitle
    }
    $.ajax({
        method: "POST",
        url: "/saved/", 
        data: {
            // Value taken from title input
            title: data.title,
        }
    })
});

