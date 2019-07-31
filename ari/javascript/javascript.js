var queryURL = "https://api.yelp.com/v3/businesses/search"

var key = "PHz4spwIAbO8IBmiVxup8uUnT3sLEbhxuQ8omoc8YFuDqYIWo7MR19D2JRVNo_YRfSyJI6tkjaaqjOpMjTs9hcT_DgkWlW3lfDEiNzW6LNWRhgRLZSbRDNSpU2k8XXYx"

//create variable based on the business.total number and then set the offset to start from there

//steps - GET original header request via ajax; originally is: hotels, restaurants, active places, doctors, 

//steps - get TOTAL from each request and sort by rating, then only show last 50

// THEN print only 1 to 2 star rated businesses

//  Then get business IDs from header request, get review pulls from that business ID

// then print out to divs

//creating variable based on the search bar input

var search = $("#dragon").val()

//adding this later after editing the HTML to include categories: 
//var dontGoWhere = $("#something").val()

$("#enterButton").on("click", function () {
    //need category dropdown and need to input it into the categories URL
    var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=" + $("#dragon").val() + "&categories=restaurants&limit=&radius=2000&offset=100&sortby=rating"

    //add in code later: "&offset=" + totalresults - 50;""
    // var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=" + search + "&categories=" + dontGoWhere + "&limit=50&sort_by=rating&radius=2000&offset=" + totalresults - 50;

    var badRest1 = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/PGxcsSK8GTWC8lMhPd0sWA/reviews"
    var badRest2 = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/WBbNYusl_jipZXJVIY4Fhg/reviews"
    var badRest3 = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/8d36keo3PhL85C0DkZbaOg/reviews"
    var badRest4 = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/Z60w4r5F5LMFJwy9kn8OaA/reviews"




    //first ajax restaurant
    $.ajax({
        url: badRest1,
        headers: {
            'Authorization': 'Bearer PHz4spwIAbO8IBmiVxup8uUnT3sLEbhxuQ8omoc8YFuDqYIWo7MR19D2JRVNo_YRfSyJI6tkjaaqjOpMjTs9hcT_DgkWlW3lfDEiNzW6LNWRhgRLZSbRDNSpU2k8XXYx',
        },
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            var totalresults = data.total;
            // Grab the results from the API JSON return
            var business = data.businesses
            var totalresults = data.total;

            console.log(data)
            // If our results are greater than 0, continue
            /* for (i = 0; i < 5; i++) {
                if (business.length > 0)  //business[i].rating === 0.5 || business[i].rating === 1.0 || business[i].rating === 1.5 || business[i].rating === 2.0 || business[i].rating === 2.5 || business[i].rating === 3) 
                {


                    // Itirate through the JSON array of 'businesses' which was returned by the API
                    $.each(data.businesses, function (i, item) {
                        // Store each business's object in a variable
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

                        $('#yelp').prepend('<div id="' + id + '" style="margin-top:50px;margin-bottom:50px;"><img src="' + image + '" style="width:120px;height:80px;"><br>We found <b>' + name + '</b> (' + alias + ')  <br> Located at: ' + address + ' ' + city + ', ' + state + ' '  + '<br>This business has a rating of ' + rating + ' with ' + reviewcount + ' reviews.</div>');

                    });
                }
            }
        */}
    })

    $.ajax({
        url: badRest1,
        headers: {
            'Authorization': 'Bearer PHz4spwIAbO8IBmiVxup8uUnT3sLEbhxuQ8omoc8YFuDqYIWo7MR19D2JRVNo_YRfSyJI6tkjaaqjOpMjTs9hcT_DgkWlW3lfDEiNzW6LNWRhgRLZSbRDNSpU2k8XXYx',
        },
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            var totalresults = data.total;
            // Grab the results from the API JSON return
            var business = data.businesses
            var totalresults = data.total;

            console.log(data)}
})

)
