

//variable for latitude and longitude for Gmaps
var latlong = [{}]
//variable for categories
var category = $("#categories").val()
//base variable for badbusinesses - if remains 0 after ajax call it will print a 'no result' message
var badBizCount = 0
var badRatingCount = 0

//on-click function for when user hits 'enter' after search
$("#enterButton").on("click", function () {
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

        //if ajax call succeeds do the following:
        success: function (data) {
            //reset badBizCount to 0
            var badBizCount = 0;

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

                //on success:
                success: function (secondData) {
                    $('#loader').hide();
                    //businesses to run for loop on:
                    var business = secondData.businesses


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
                            var bizlatlong = [item.coordinates.latitude + "," + item.coordinates.longitude]

                            //pushes the above array into the larger location array
                            latlong.push(bizlatlong);

                            console.log(id)
                            //for every bad business it adds 1 to badBizCount
                            badBizCount++;
                            //adds a div with all the yelp html
                            $('#yelp').prepend('<div id="' + id + '" class="badBusinesses" style="margin-top:50px;margin-bottom:50px;"><img class="importedImg" src="' + image + '"><br><b>' + name + '</b><br> Located at: ' + address + ' ' + city + ', ' + state + ' ' + zipcode + '<br>The phone number for this business is: ' + phone + '<br>This business has a rating of ' + rating + ' with ' + reviewcount + ' reviews.<br><a class="yelpClick" yelp="' + id + '" href="javascript:void(0);">Click here for reviews</a><br></div>');


                        }

                    }
                    //on click function to zoom and unzoom the pictures inside the yelp 
                    $(".importedImg").on("click", function () {
                        $(this).toggleClass("importedImg zoomedImg");
                        console.log("clicked");
                    })

                    console.log(badBizCount)

                    console.log(latlong);

                    //if there is more than 1 bad business, input categories text as the header for the section being added to the page
                    if (badBizCount > 0) {
                        $("#yelp").prepend("<h3>" + ($("#categories option:selected").text()) + ":</h3>")
                    } else {//or else add that there's nothing there
                        $("#yelp").prepend("<h3>" + ($("#categories option:selected").text()) + ":</h3>" + "<h5>Hmmm....not that bad!</h5>")
                    }



                }

            })
        }
    })
}

)

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
            $('#loader').hide();
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
                    $("#" + attrId).append('<div class="overflow reviewClass' + attrId + '" id="' + id + '"><h6>Rating:' + rating + '</h6><p>' + text + '</p> <span><a class="removeLinks' + attrId + '" href="' + reviewLinks + '" target="_blank">click here for full review</a> </span>')
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
})