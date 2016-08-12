"use strict";

// This goes at the top because it needs to be defined to get called when results are displayed
function scheduleEventListerForRestaurantButtons(){
  // 
  // $('.restaurant-button').click(showRestaurantInfo);
  $('.add-button').click(addRestaurant);

}

// AJAX to display results of query using Yelp API response
function displayResults(data) {
    var text = "";
    for (var i = 0; i < data.results.length; i++){
      text = text + "<button class='restaurant-button btn' type='button'id=" + "'button" + i + "'" + 
                             "data-restaurant-name=" + '"' + data.results[i].name + '"' +
                             "data-yelp-rating=" + "'" + data.results[i].rating + "'" +
                             "data-address=" + "'" + data.results[i].address + "'" +
                             "data-categories=" + "'" + data.results[i].categories + "'" +
                             "data-neighborhoods=" + '"' + data.results[i].neighborhoods + '"' +
                             "data-latitude=" + "'" + data.results[i].latitude + "'" +
                             "data-longitude=" + "'" + data.results[i].longitude + "'" + 
                             "data-url=" + "'" + data.results[i].url + "'" + 
                             ">" +
                      "<span>" + data.results[i].name + "</span>" + 
                    "</button>";
    }
    $('#yelpResultsPanel').removeClass('hidden');
    $('#results').html(text);


    $('.restaurant-button').click(function() {
      var name = $(this).data('restaurant-name');
      var yelp = $(this).data('yelp-rating');
      var address = $(this).data('address');
      var categories = $(this).data('categories');
      var neighborhoods = $(this).data('neighborhoods') ? ($(this).data('neighborhoods')).split(",") : null;
      var latitude = $(this).data('latitude');
      var longitude = $(this).data('longitude');
      var url = $(this).data('url');
      var infobox = "<table class='table'><tr><td class='title'>" + name + "</td></tr>" + 
                             "<tr><td class='title'>Yelp Rating: " + yelp + "</td></tr>" + 
                             "<tr><td class='title'>Address: " + address + "</td></tr>" + 
                             "<tr><td class='title'>Neighborhood: " + ( neighborhoods ? neighborhoods.join(", ") : "None" ) + 
                             "</td></tr></table>" + 
                             "<button type='button' class='add-button btn' id='button' " + 
                             "data-restaurant-name=" + '"' + name + '"' +
                             "data-yelp-rating=" + "'" + yelp + "'" +
                             "data-address=" + "'" + address + "'" +
                             "data-categories=" + "'" + categories + "'" +
                             "data-neighborhoods=" + '"' + neighborhoods + '"' +
                             "data-latitude=" + "'" + latitude + "'" +
                             "data-longitude=" + "'" + longitude + "'" +
                             "data-url=" + "'" + url + "'" + ">" +
                             "Add " + name +"</button>";
      console.log(infobox);
      $('#infobox').removeClass('hidden').html(infobox);
      var latlng = {lat: parseFloat(latitude), lng: parseFloat(longitude)};
      // TRYING TO MAKE IT SUCH THAT THE MARKER GETS ADDED AND THEN DISAPPEARS WHEN ANOTHER YELP RESULT IS CLICKED
      var lastMarker = markers[markers.length - 1];
      if (lastMarker && lastMarker.icon === otherIcon) {
        lastMarker.setMap(null);
        markers.pop();
      }
      initMap();
      addMarker(latlng, name, otherIcon);
      markers.push(marker);
      for (var j = 0; j < markers.length; j++) {
        bounds.extend(markers[j].getPosition());
      }
      map.fitBounds(bounds);
      scheduleEventListerForRestaurantButtons();
      $(this).addClass('btn-info');
      $('#my-map').addClass('small');
    })
    // gives access to the add restaurant event listener once items are loaded
}

function submitSearch(evt) {
    evt.preventDefault();
    var formInputs = {
        "location": $("#location").val(),
        "term": $("#term").val()
    };
    $('#yelpResultsPanel').removeClass('hidden');
    $('#results').html("searching...");;
    $.post("/search-restaurant.json",
           formInputs,
           displayResults
           );
}

$("#search").on("submit", submitSearch);

// sends restaurant data to server to add restaurant to list
function addRestaurant(evt){

    var id = this.id; // this is the id on the button we clicked, which is the image's id
    var restaurantName = $(this).data('restaurant-name');
    var yelp_rating = $(this).data('yelp-rating');
    var latitude = $(this).data('latitude');
    var longitude = $(this).data('longitude');
    var listId = $("#list-info").data('listid');
    var address = $(this).data('address');
    var categories = $(this).data('categories');
    var neighborhoods = $(this).data('neighborhoods');
    var url = $(this).data('url');

    console.log(restaurantName);

    $.post("/add-restaurant.json", {'id': id,
                               'restaurant_name': restaurantName,
                               'yelp_rating': yelp_rating,
                               'latitude': latitude,
                               'longitude': longitude,
                               'list_id': listId,
                               'address': address,
                               'categories': categories,
                               'neighborhoods': neighborhoods,
                               'url': url},
                               getRestaurantsFromDB);

    $('.add-button').html("Added!");
    
}


// #################################################################
// vanish flash messages

$(document).ready(function(){
  setTimeout(function(){
    $('.flash').fadeOut();
  }, 3000);
 });
