"use strict";

function restaurantAdded(){
  console.log("study location added YAY");
}

function addRestaurant(evt){
  console.log("poop");
    var restaurantName = $(evt.target).data('restaurant-name');
    var latitude = $(evt.target).data('latitude');
    var longitude = $(evt.target).data('longitude');
    var address = $(evt.target).data('address');
    var neighborhoods = $(evt.target).data('neighborhoods');
    console.log(restaurantName);

    $.post("/add-restaurant", {
                               'restaurant_name': restaurantName,
                               'latitude': latitude,
                               'longitude': longitude,
                               'address': address,
                               'event_id': getEventId,
                               'neighborhoods': neighborhoods,
                               },
                               restaurantAdded);
    function getEventId() {
      var componenets = window.location.href.split("/")
      var idx = componenets.length - 1
      var eventId = componenets[idx]
      return eventId
      }

    $('.add-button').html("Added!");
    
}
 
function scheduleEventListerForRestaurantButtons(){
  $('.add-button').click(addRestaurant);
  console.log("here");
}


// ################################################################################

// succes function that displays results of yelp. 
function displayResults(data) {
    var text = "";
    for (var i = 0; i < data.results.length; i++){
      text = text + "<div style='padding:10px; cursor:pointer; border:1px solid #D3D3D3;'class='restaurant-button'" + 
                             "data-restaurant-name=" + '"' + data.results[i].name + '"' +
                             "data-address=" + "'" + data.results[i].address + "'" +
                             "data-neighborhoods=" + '"' + data.results[i].neighborhoods + '"' +
                             "data-latitude=" + "'" + data.results[i].latitude + "'" +
                             "data-longitude=" + "'" + data.results[i].longitude + "'" + 
                             " style='boder:none;'>" +
                      "<span>" +  data.results[i].name  + "</span>" + 
                    "</div>"
    }
    
    $('#yelpResultsPanel').removeClass('hidden');
    $('#results').html(text);


    $('.restaurant-button').click(function() {
      var name = $(this).data('restaurant-name');
      var address = $(this).data('address');
      var neighborhoods = $(this).data('neighborhoods') ? ($(this).data('neighborhoods')).split(",") : null;
      var latitude = $(this).data('latitude');
      var longitude = $(this).data('longitude');
      var infobox = "<table class='table'><tr><td class='title'>" + name + "</td></tr>" + 
                             "<tr><td class='title'>Address: " + address + "</td></tr>" + 
                             "<tr><td class='title'>Neighborhood: " + ( neighborhoods ? neighborhoods.join(", ") : "None" ) + 
                             "</td></tr></table>" + 
                             "<button type='button' class='add-button btn btn-default' id='button' " + 
                             "data-restaurant-name=" + '"' + name + '"' +
                             "data-address=" + "'" + address + "'" +
                             "data-neighborhoods=" + '"' + neighborhoods + '"' +
                             "data-latitude=" + "'" + latitude + "'" +
                             "data-longitude=" + "'" + longitude + "'" 
                             + ">" +
                             "Add " + name +"</button>";
      console.log(infobox);
      $('#infobox').removeClass('hidden').html(infobox);
      var latlng = {lat: parseFloat(latitude), lng: parseFloat(longitude)};
      // TRYING TO MAKE IT SUCH THAT THE MARKER GETS ADDED AND THEN DISAPPEARS WHEN ANOTHER YELP RESULT IS CLICKED
      var lastMarker = markers[markers.length - 1];

     
      initMap();
      addMarker(latlng, name);
      markers.push(marker);
      for (var j = 0; j < markers.length; j++) {
        bounds.extend(markers[j].getPosition());
      }
      map.fitBounds(bounds);
      scheduleEventListerForRestaurantButtons();
    
     
    })
    // gives access to the add restaurant event listener once items are loaded
}


// submits search to yelp and will return results as a JSON object
function submitSearch(evt) {
    evt.preventDefault();
    var formInputs = {
        "location": $("#location").val(),
        "term": $("#term").val()
    };
    console.log(formInputs);
    $('#yelpResultsPanel').removeClass('hidden');
    $('#results').html("searching...");
    $.post("/search-location.json", formInputs, displayResults);
}


// Initianal event listener
$("#search").on("submit", submitSearch);
