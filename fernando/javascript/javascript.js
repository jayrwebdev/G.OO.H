// API for Urban Dictionary...

// variables required
var miamiDefinitions = ["a","b","c","d"];
var city = "miami+definition";

// as soon as the page is loaded this code runs
$(function(){

    addText();
    clickButton();

  function addText(){
    $("#enterButton").on("click", function(){
      var inputMiami = $("#dragon").val();
      if (inputMiami = "miami"){
        var a = $("<div>");
        a.addClass (".time");
        a.text("It's they city that scares you to be in and love every part of, its got nightlife and parts that will end your life at night!");
        $(".time").append(a);
      }
    })
  }

// function to create a button on <div> with class=time
  /*  function addButton(){
        // make sure only this button is added
        $(".time#").empty();
        // add a button to call the Urban Dictionary API
        var a = $("<button>");
        // add classes to our Miami button
        a.addClass("btn btn-lg btn-outline-dark miamiButton");
        // add a text to the button
        a.text("Miami, this is how we roll!");
        // Add the button to the div with class=time
        $(".time").append(a);
    }; */

    function clickButton(){
        $(".miamiButton").on("click", function(){
        //   var queryURL = 'https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=' +
         //   city + '&X-RapidAPI-Key=66d12ff58bmshb9ca2e2b0298cb9p1e723ejsn7c3dd0db9339&limit=10'; 
         //   var queryURL = 'https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=' + city +

         var queryURL = 'https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=' +
           city + '&limit=10';

         
     /*    var options = { 
            method: 'GET',
          url: queryURL,
          headers: { 
            'cache-control': 'no-cache',
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': '66d12ff58bmshb9ca2e2b0298cb9p1e723ejsn7c3dd0db9339',
            'header1': 'mashape-community-urban-dictionary.p.rapidapi.com'
          },
          qs: { 
            parameter1: 'miami+definition' 
          }
        };
        
        request(options, function (error, response, body) 
       {
          if (error) throw new Error(error);
          console.log(body);
        }); */

           $.ajax({
            url: queryURL,
            method: "GET",
            dataType: 'json',
            api_key: '66d12ff58bmshb9ca2e2b0298cb9p1e723ejsn7c3dd0db9339',
            headers: {property: "value"}
            
       }).then(function(response) {
            console.log(response);


        });

     })
    } 
});