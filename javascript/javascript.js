var queryURL = "https://api.yelp.com/v3/businesses/search"

var key = "PHz4spwIAbO8IBmiVxup8uUnT3sLEbhxuQ8omoc8YFuDqYIWo7MR19D2JRVNo_YRfSyJI6tkjaaqjOpMjTs9hcT_DgkWlW3lfDEiNzW6LNWRhgRLZSbRDNSpU2k8XXYx"

//creating variable based on the search bar input


$("#enterButton").on("click", function () {
  //inputs search into new 
  var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=Miami?sort_by=rating";

 
  $.ajax({
    url: myurl,
    headers: {
      'Authorization': 'Bearer PHz4spwIAbO8IBmiVxup8uUnT3sLEbhxuQ8omoc8YFuDqYIWo7MR19D2JRVNo_YRfSyJI6tkjaaqjOpMjTs9hcT_DgkWlW3lfDEiNzW6LNWRhgRLZSbRDNSpU2k8XXYx',
    },
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      // Grab the results from the API JSON return
      var totalresults = data.total;
      var business = data.businesses;
      console.log(data)
      console.log(totalresults)
      // If our results are  greater than 0, continue
      for (var i = 0; i < business.length; i++) {
        if (totalresults > 0) {
          // Display a header on the page with the number of results
          //$('#yelp').append('<h5>We discovered ' + totalresults + ' results!</h5>');
          // Itirate through the JSON array of 'businesses' which was returned by the API
          // Store each business's object in a variable
          var item = business[i]
          var id = item.id;
          var alias = item.alias;
          var phone = item.display_phone;
          var image = item.image_url;
          var name = item.name;
          var rating = item.rating;
          var reviewcount = item.review_count;
          var address = item.location.address1;
          var city = item.location.city;
          var state = item.location.state;
          var zipcode = item.location.zip_code;
          // Append our result into our page
          $('#yelpStuff').prepend('<div class="results" id="' + id + '" style="margin-top:50px;margin-bottom:50px;"><img src="' + image + '" style="width:200px;height:150px;"><br>We found <b>' + name + '</b> (' + alias + ')<br>Business ID: ' + id + '<br> Located at: ' + address + ' ' + city + ', ' + state + ' ' + zipcode + '<br>The phone number for this business is: ' + phone + '<br>This business has a rating of ' + rating + ' with ' + reviewcount + ' reviews.</div>');
        };


      }
    }
  })
})
$("#enterButton").on("click", "value", function () {
  
  for (var i = 0; i < latlong.length ; i++) {
    $('#latlng').value = latlong[i];
  }
  
})

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 25.761681, lng: -80.191788 },
    zoom: 8
  });


  var geocoder = new google.maps.Geocoder;
  var infowindow = new google.maps.InfoWindow;

  $('#submit').on('click', function () {
    geocodeLatLng(geocoder, map, infowindow);
  });
}
function geocodeLatLng(geocoder, map, infowindow) {
  var input = $('#latlng').val()
  var latlngStr = input.split(',', 2);
  var latlng = { lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1]) };
  geocoder.geocode({ 'location': latlng }, function (results, status) {
    if (status === 'OK') {
      if (results[0]) {
        map.setZoom(11);
        var marker = new google.maps.Marker({
          position: latlng,
          map: map
        });
        infowindow.setContent(results[0].formatted_address);
        infowindow.open(map, marker);
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}
