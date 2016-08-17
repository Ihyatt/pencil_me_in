"use strict";

function restaurantAdded(){
  console.log("study location added YAY");
}

function addRestaurant(evt){
  console.log("poop");
    // var id = this.id; // this is the id on the button we clicked, which is the image's id
    var restaurantName = $(this).data('restaurant-name');
    var latitude = $(this).data('latitude');
    var longitude = $(this).data('longitude');
    var address = $(this).data('address');
    var neighborhoods = $(this).data('neighborhoods');
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
    return componenets[idx]
    }

    $('.add-button').html("Added!");
    
}
 
function scheduleEventListerForRestaurantButtons(){
  $('.add-button').click(addRestaurant);
  console.log("here");
}


// ################################################################################


function displayResults(data) {
    var text = "";
    for (var i = 0; i < data.results.length; i++){
      text = text + "<button class='restaurant-button btn' type='button'id=" + "'button" + i + "'" + 
                             "data-restaurant-name=" + '"' + data.results[i].name + '"' +
                             "data-address=" + "'" + data.results[i].address + "'" +
                             "data-neighborhoods=" + '"' + data.results[i].neighborhoods + '"' +
                             "data-latitude=" + "'" + data.results[i].latitude + "'" +
                             "data-longitude=" + "'" + data.results[i].longitude + "'" + 
                             ">" +
                      "<span>" + data.results[i].name + "</span>" + 
                    "</button>";
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
                             "<button type='button' class='add-button btn' id='button' " + 
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
    $.post("/search-location.json", formInputs, displayResults);
}



$("#search").on("submit", submitSearch);
