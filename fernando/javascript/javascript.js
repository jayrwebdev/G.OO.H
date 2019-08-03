// API for Urban Dictionary...

// variables required
var city = "";

// as soon as the page is loaded this code runs
$(function(){

  callDictionary();
 
    function callDictionary(){
      $("#enterButton").on("click", function(){
        // empty div with class=time
        $(".time").html("");
        // capture the city user inputs
        city = $("#dragon").val().trim();
        
        var queryURL = 'https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=' +
        city + '';
        // do Urban Dictionary api call
            $.ajax({
            url: queryURL,
            method: "GET",
            dataType: 'json',
            headers: {"X-RapidAPI-Host": "mashape-community-urban-dictionary.p.rapidapi.com",
            "X-RapidAPI-Key": "66d12ff58bmshb9ca2e2b0298cb9p1e723ejsn7c3dd0db9339"}
        
            }).then(function(response) {
              // with api response loop through definitions and pick first 5
                var results = response.list;
                    console.log(results);
                    // empty div with class=time
                    $(".time").html("");
                    // order results by number
                    var pos=1;
                      for(var i = 1; i < 6; i++)
                      {
                        // append responses to div with class=time
                       $(".time").append("<p>" + pos + ": " + results[i].definition + "</p>");
                       $(".time").scrollTop(400);
                      pos++
                      }
            });
        });  
  } 
});
