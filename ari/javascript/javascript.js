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
    var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=" + $("#dragon").val() + "&categories=restaurants&limit=50&radius=2000"

    //add in code later: "&offset=" + totalresults - 50;""
    // var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=" + search + "&categories=" + dontGoWhere + "&limit=50&sort_by=rating&radius=2000&offset=" + totalresults - 50;

    $.ajax({
        url: myurl,
        headers: {
            'Authorization': 'Bearer PHz4spwIAbO8IBmiVxup8uUnT3sLEbhxuQ8omoc8YFuDqYIWo7MR19D2JRVNo_YRfSyJI6tkjaaqjOpMjTs9hcT_DgkWlW3lfDEiNzW6LNWRhgRLZSbRDNSpU2k8XXYx',
        },
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            var totalresults = data.total;
            $.ajax({
                url: myurl + "&offset=" + totalresults - 50,
                headers: {
                    'Authorization': 'Bearer PHz4spwIAbO8IBmiVxup8uUnT3sLEbhxuQ8omoc8YFuDqYIWo7MR19D2JRVNo_YRfSyJI6tkjaaqjOpMjTs9hcT_DgkWlW3lfDEiNzW6LNWRhgRLZSbRDNSpU2k8XXYx',
                },
                method: 'GET',
                dataType: 'json',
                success: function (secondData) {
                    // Grab the results from the API JSON return
                    var business = secondData.businesses
                    var totalresults = secondData.total;

                    console.log(secondData)
                    // If our results are greater than 0, continue
                    for (i = 0; i < 5; i++) {
                        if (business[i].rating === 0.5 || business[i].rating === 1.0 || business[i].rating === 1.5 || business[i].rating === 2.0 || business[i].rating === 2.5 || business[i].rating === 3) {


                            // Itirate through the JSON array of 'businesses' which was returned by the API
                            $.each(secondData.businesses, function (i, item) {
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

                                $('#yelp').append('<div id="' + id + '" style="margin-top:50px;margin-bottom:50px;"><img src="' + image + '" style="width:200px;height:150px;"><br>We found <b>' + name + '</b> (' + alias + ')<br>Business ID: ' + id + '<br> Located at: ' + address + ' ' + city + ', ' + state + ' ' + zipcode + '<br>The phone number for this business is: ' + phone + '<br>This business has a rating of ' + rating + ' with ' + reviewcount + ' reviews.</div>');

                            });
                        }
                    }
                }
            })
        }

    })
})