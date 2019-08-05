var map;
jQuery(function ($) {
  // Asynchronously Load the map API 
  var script = document.createElement('script');
  script.src = "https://maps.googleapis.com/maps/api/js?sensor=false&key=AIzaSyBYrSwBkmTj5gzN4NObWjt4z7BMmsA6uUk&callback=initialize";
  document.body.appendChild(script);
});

function initialize() {
  var map;
  var bounds = new google.maps.LatLngBounds();
  var mapOptions = {
    mapTypeId: 'roadmap'
  };

  // Display a map on the page
  map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
  map.setTilt(45);

  // Multiple Markers
  var markers = [
    ['The World', 0, 0],
    ['America', 41.8780, -93.0977]
  ];

  // Info Window Content
  var infoWindowContent = [
    ['<div class="info_content">' +
      '<h3>The world:</h3>' +
      '<p>A place where bad things exist, things that you want to avoid.</p>' + '</div>'],
    ['<div class="info_content">' +
      '<h3>America:</h3>' +
      '<p>A place where you probably are.' + '</div>']
  ];

  // Display multiple markers on a map
  var infoWindow = new google.maps.InfoWindow(), marker, i;

  // Loop through our array of markers & place each one on the map  
  for (i = 0; i < markers.length; i++) {
    var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
    bounds.extend(position);
    marker = new google.maps.Marker({
      position: position,
      map: map,
      title: markers[i][0]
    });

    // Allow each marker to have an info window    
    google.maps.event.addListener(marker, 'click', (function (marker, i) {
      return function () {
        infoWindow.setContent(infoWindowContent[i][0]);
        infoWindow.open(map, marker);
      }
    })(marker, i));

    // Automatically center the map fitting all markers on the screen
    map.fitBounds(bounds);
  }

  // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
  var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function (event) {
    this.setZoom(1);
    google.maps.event.removeListener(boundsListener);
  });

}


// API for Urban Dictionary...

// variables required
var city = "";

// as soon as the page is loaded this code runs
$(function () {

  callDictionary();

  function callDictionary() {
    $("#enterButton").on("click", function () {
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
        headers: {
          "X-RapidAPI-Host": "mashape-community-urban-dictionary.p.rapidapi.com",
          "X-RapidAPI-Key": "66d12ff58bmshb9ca2e2b0298cb9p1e723ejsn7c3dd0db9339"
        }

      }).then(function (response) {
        // with api response loop through definitions and pick first 5
        var results = response.list;
        console.log(results);
        // empty div with class=time
        $(".time").html("");
        // order results by number
        var pos = 1;



        for (var i = 1; i < 3; i++) {
          // append responses to div with class=time
          $(".time").append("<p id='paragraph'>" + pos + ": " + results[i].definition.replace(/[\[\]‘]+/g, '') + "</p>");
          $(".time").scrollTop(400);
          pos++
        }
        $(".time").prepend('<h1 class="cityText" style="text-align:center;">' + city.toLocaleUpperCase() + "</h1>")
      });
    });
  }
});

//YELP API CODE

//variable for latitude and longitude for Gmaps
var latlong = [{}]
//variable for categories
var category = $("#categories").val()
//base variable for badbusinesses - if remains 0 after ajax call it will print a 'no result' message
var badBizCount = 0
var badRatingCount = 0

//on-click function for when user hits 'enter' after search
$("#enterButton").on("click", function () {
  event.preventDefault();
  $(".introText").hide()
  // var time=$('<div class="container"><div class="row"><div id="cannon" class="col-lg-11 offset-lg-1 time"></div></div>')
     $("#cannon").addClass("time")
  //creates variable for loading image
  var loader = $("#yelp").prepend('<img id="loader" src="images/loader.gif">')
  //creates variable for searchbar
  var search = $("#dragon").val()
  //replaces ,'s with +'s for yelp api
  search = search.replace(/,/g, "+")
  //replaces spacess with +'s for yelp api
  search = search.replace(/ /g, "+")
  //below is URL for ajax call with variables in place for search
  var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=" + search + "&categories=" + $("#categories").val() + "&limit=50&radius=2000"


  //ajax call with above url
  $.ajax({
    url: myurl,
    //authorization key
    headers: {
      'Authorization': 'Bearer PHz4spwIAbO8IBmiVxup8uUnT3sLEbhxuQ8omoc8YFuDqYIWo7MR19D2JRVNo_YRfSyJI6tkjaaqjOpMjTs9hcT_DgkWlW3lfDEiNzW6LNWRhgRLZSbRDNSpU2k8XXYx',
    },
    method: 'GET',
    dataType: 'json',
    //adds loading gif to page while ajax call is running
    beforeSend: function () {
      loader
    },
    //when ajax call is finished running, loader will disappear
    complete: function () {
      $('#loader').hide();
    },
    //if ajax call succeeds do the following:
    success: function (data) {
      //reset badBizCount to 0
   

      //below sets the offset for the second ajax call to run. we are sorting results by rating and only returning the last 50, with hope that the worst results will be on that page. 
      var totalresults = data.total;
      //if statement so that results total doesn't exceed 1000 which will break the api call
      if (totalresults >= 1000) {
        totalresults = 950
      } else { totalresults -= 50 }
      //converts totalresults to string so it can be input in second ajax call
      totalresults.toString();
      //console logs numbers to test them
      console.log(totalresults)
      console.log(data)
      console.log(myurl)
      //adds offset to first url so ajax call can be run a second time
      var secondURL = myurl + "&offset=" + totalresults
      console.log(secondURL)
      //second ajax call
      $.ajax({
        url: secondURL,
        headers: {
          'Authorization': 'Bearer PHz4spwIAbO8IBmiVxup8uUnT3sLEbhxuQ8omoc8YFuDqYIWo7MR19D2JRVNo_YRfSyJI6tkjaaqjOpMjTs9hcT_DgkWlW3lfDEiNzW6LNWRhgRLZSbRDNSpU2k8XXYx',
        },
        method: 'GET',
        dataType: 'json',
        //loader initialize
        beforeSend: function () {
          loader
        },
        //loader hide
        complete: function () {
          $('#loader').hide();
        },
        //on success:
        success: function (secondData) {
          //businesses to run for loop on:
          var business = secondData.businesses
          var countAllTheStuffInASection=0
          var badBizCount=0
          console.log(secondData)
          //for every business, 
          for (i = 0; i < business.length; i++) {
            
            
            var item = business[i]
            var reviewcount = item.review_count;
            var rating = item.rating;
            //check if each business has a rating less than 3 and more than 9 reviews (so that way we return truly bad results)
            if (rating < 3 && reviewcount > 9) {

              //variables that will be used in html generation

              var id = item.id;
              var alias = item.alias;
              var phone = item.display_phone;
              var image = item.image_url;
              var name = item.name;
              var address = item.location.address1;
              var city = item.location.city;
              var state = item.location.state;
              var zipcode = item.location.zip_code;
              //add business location to google maps
              var geoCodeArray = []
              var mapInfoWindow = []
              geoCodeArray.push(name)
              geoCodeArray.push(item.coordinates.latitude)
              geoCodeArray.push(item.coordinates.longitude)
              console.log(geoCodeArray)
              latlong.push(geoCodeArray)


              //pushes the above array into the larger location array


              console.log(id)
              //for every bad business it adds 1 to badBizCount
              badBizCount++;
              countAllTheStuffInASection++
              //adds a div with all the yelp html
              $('#yelp').prepend('<div class="bizCount">'+countAllTheStuffInASection+'.</div><div id="' + id + '" class="badBusinesses" style="margin-top:50px;margin-bottom:50px;"><img class="importedImg" src="' + image + '"><p id="mobileText">tap on photo to enlarge/shrink</p><br><b>' + name + '</b><br> Located at: ' + address + ' ' + city + ', ' + state + ' ' + zipcode + '<br>The phone number for this business is: ' + phone + '<br>This business has a rating of ' + rating + ' with ' + reviewcount + ' reviews.<br><a class="yelpClick" yelp="' + id + '" href="javascript:void(0);">Click here for reviews</a><br></div>');
              //create array of info for mapinfo window
              var forLoopContent = ['<div class="info_content">' +
                '<h3>' + name + ':</h3>' +
                '<p>' + address + ' ' + city + ', ' + state + ' ' + zipcode + '</p><p> Rating: ' + rating + '</p></div>']
//push mapinfowindow into mapInfoWindow array
              mapInfoWindow.push(forLoopContent)
            }

          }

          
          //on click function to zoom and unzoom the pictures inside the yelp 
          $(".importedImg").on("click", function () {
            $(this).toggleClass("importedImg zoomedImg");
            console.log("clicked");
          })

          console.log(badBizCount)
          latlong.shift()
          console.log(latlong);
          console.log(mapInfoWindow)
countAllTheStuffInASection=0
          //if there is more than 1 bad business, input categories text as the header for the section being added to the page
          if (badBizCount > 0) {
            $("#yelp").prepend('<h1 class="headerText">' + ($("#categories option:selected").text().toUpperCase()) + ":</h1>")
          } else {//or else add that there's nothing there
            $("#yelp").prepend('<h1 class="headerText">' + toUpperCase($("#categories option:selected").text().toUpperCase()) + ":</h1>" + "<h5>Hmmm....not that bad!</h5>")


          }

        
          //


//start map



function initialize() {
 
  var bounds = new google.maps.LatLngBounds();
  var mapOptions = {
    mapTypeId: 'roadmap'
  };

  // Display a map on the page
  map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
  map.setTilt(45);

  // Multiple Markers
  var markers = [
    ['The World', 0, 0],
    ['America', 41.8780, -93.0977]
  ];

  // Info Window Content
  var infoWindowContent = [
    ['<div class="info_content">' +
      '<h3>The world:</h3>' +
      '<p>A place where bad things exist, things that you want to avoid.</p>' + '</div>'],
    ['<div class="info_content">' +
      '<h3>America:</h3>' +
      '<p>A place where you probably are.' + '</div>']
  ];

  // Display multiple markers on a map
  var infoWindow = new google.maps.InfoWindow(), marker, i;

  // Loop through our array of markers & place each one on the map  
  for (i = 0; i < markers.length; i++) {
    var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
    bounds.extend(position);
    marker = new google.maps.Marker({
      position: position,
      map: map,
      title: markers[i][0]
    });

    // Allow each marker to have an info window    
    google.maps.event.addListener(marker, 'click', (function (marker, i) {
      return function () {
        infoWindow.setContent(infoWindowContent[i][0]);
        infoWindow.open(map, marker);
      }
    })(marker, i));

    // Automatically center the map fitting all markers on the screen
    map.fitBounds(bounds);
  }

  // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
  var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function (event) {
    this.setZoom(1);
    google.maps.event.removeListener(boundsListener);
  });

}


//end map


          
    

    }})

}})
})




//when clicking yelpClick, 
$(document).on("click", ".yelpClick", function (event) {
  //add the gif loader
  var loader = $(this).prepend('<img id="loader" src="images/loader.gif">')
  event.preventDefault()
  //create attribute for the link's "yelp" data-attribute
  var attrId = $(this).attr("yelp")
  //add ajax call based on the reviews and yelpvalue
  var reviewURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" + attrId + "/reviews"
  $.ajax({
    //get restaurant review search
    url: reviewURL,
    headers: {
      'Authorization': 'Bearer PHz4spwIAbO8IBmiVxup8uUnT3sLEbhxuQ8omoc8YFuDqYIWo7MR19D2JRVNo_YRfSyJI6tkjaaqjOpMjTs9hcT_DgkWlW3lfDEiNzW6LNWRhgRLZSbRDNSpU2k8XXYx',
    },
    method: 'GET',
    dataType: 'json',
    //start showing loader
    beforeSend: function () {
      loader
    },
    //dont show loader
    complete: function () {
      $('#loader').remove();
    },
    success: function (data) {
      console.log(data)
      //set badratings to 0
      badRatingCount = 0
      //run through all the reviews
      for (i = 0; i < data.reviews.length; i++) {
        var item = data.reviews[i]
        var id = item.id
        var rating = item.rating
        var reviewLinks = item.url;
        var text = item.text
        console.log(reviewLinks)
        //add stars to the review based on the star rating
        if (rating == 0) {
          $("#" + attrId).append('<img src="ari/images/yelp_stars/web_and_ios/small_0.png" class="reviewClass' + attrId + '">')
        }
        if (rating == 1) {
          $("#" + attrId).append('<img src="images/yelp_stars/web_and_ios/small/small_1.png" class="reviewClass' + attrId + '">')
        }
        if (rating == 2) {
          $("#" + attrId).append('<img src="images/yelp_stars/web_and_ios/small/small_2.png" class="reviewClass' + attrId + '">')
        }
        if (rating == 3) {
          $("#" + attrId).append('<img src="images/yelp_stars/web_and_ios/small/small_3.png" class="reviewClass' + attrId + '">')
        }
        //add the following for the rating is less than 3
        if (rating <= 3) {
          //add to badRatingCount
          badRatingCount++;
          //append the following text to the review
          $("#" + attrId).append('<div class="reviewClass' + attrId + '" id="' + id + '"><h6>Rating:' + rating + '</h6><p>' + text + '</p> <span><a class="removeLinks' + attrId + '" href="' + reviewLinks + '" target="_blank">click here for full review</a> </span>')
        }

      }
      //if no bad ratings, show below message
      if (badRatingCount = 0) {
        $("#" + attrId).append("<h6>Looks like yelp isn't giving us bad enough ratings....but trust us... this place is terrible!</h6>")
      }
      //after comments are generated, attach a hide comment link
      $("#" + attrId).append('<a href="javascript:void(0);" class="hideComment reviewClass' + attrId + '" yelp="' + attrId + '">Hide comments</a>')



    }
  })
})
//when clicking hide comment, hide everything with the same attribute as the thing you're clicking
$(document).on('click', ".hideComment", function (e) {
  e.preventDefault();
  var attrId = $(this).attr("yelp")
  $(".reviewClass" + attrId).remove();
  $("#loader").remove();
})