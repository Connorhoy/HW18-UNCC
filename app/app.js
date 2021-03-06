// APP JS CODE

$(document).ready(function(){
    console.log('I work');

    var _id;

    $("#scrape").on('click', function(){

      $.get("/scraper", function(){
        alert('success');
      })
      .done(function(){
        window.location = "/";
      })
      .fail(function(err){
        alert(JSON.stringify(err));
      });

    });

    $("#inner").on('click', '.favorite', function(){
      _id = $(this).attr('data-id');

      $.post("/favorite/" + _id, function(){
        console.log('favorited');
      })
      .done(function(){
        window.location = "/";
      })
      .fail(function(err){
        alert(JSON.stringify(err));
      });

    });

    $("#inner").on('click', '.unfavorite', function(){
      _id = $(this).attr('data-id');

      $.post("/unfavorite/" + _id, function(){
        console.log('unfavorited');
      })
      .done(function(){
        window.location = "/favorites";
      })
      .fail(function(err){
        alert(JSON.stringify(err));
      });

    });

    $("#inner").on('click', 'p', function(){
      console.log('clicked p');
      _id = $(this).attr('data-id');
      console.log(_id);

      $.get("/notes/" + _id, function(){
        console.log('notes');
      })
      .done(function(data){
        console.log(data);
        $("#title").text(data.title);
        $("#resultsModal").modal("toggle");

        $(".note-body").remove();
        $(".delete-button").remove();

        for(var i = 0; i < data.notes.length; i++){
          var newDiv = $("<div>").text(data.notes[i].body);
          newDiv.attr('class', 'note-body');
          var newButton = $("<button>").text('Delete');
          newButton.attr('class', 'delete-button');
          newButton.attr('data-id', data.notes[i]._id);

          $("#modal-insert").append(newDiv);
          $("#modal-insert").append(newButton);
        }

      })
      .fail(function(err){
        console.log(err);
      });

    });

    $(".container-fluid").on('click', ".delete-button", function(){
      _id = $(this).attr('data-id');

      $.post("/remove/" + _id, function(){
        console.log('removing');
      })
      .then(function(){
        location.reload();
      })
      .fail(function(err){
        alert(JSON.stringify(err));
      });

    });

    $(".container-fluid").on('click', '#submitNote', function(event){
      event.preventDefault();

      var note = {
        text: $("#inputNote").val()
      }

      $.post("/notes/" + _id, note)
      .then(function(){
        location.reload();
      })
      .fail(function(err){
        alert(JSON.stringify(err));
      });

    });

});