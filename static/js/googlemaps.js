var map;
var marker;
var infoWindow;
var markers = [];





var bounds = new google.maps.LatLngBounds();

function addMarker(latlng, name) {
  marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title: name,
        // icon : icon,
        animation: google.maps.Animation.DROP,
      });
  return marker;
}

function bindInfoWindow(marker, map, infoWindow, contentString) {
    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.close();
        infoWindow.setContent(contentString);
        infoWindow.open(map, marker);
    });
}

function initMap() {

  // using ternary operator to create default lat/long when there are no restaurants in a list initially/if no lat or long exists
  var centerLatLng = { lat : 40, lng: -121.8863};
  // SET BOUNDS DEFAULT

  
  var mapOptions = {
    // sets map center to the first item in places list 
    center: centerLatLng,
    zoom: 3
    };

  var infoWindow = new google.maps.InfoWindow({
    maxWidth: 75
    });
  

  map = new google.maps.Map(document.getElementById('my-map'), mapOptions);

  var bounds = new google.maps.LatLngBounds();

}


google.maps.event.addDomListener(window, 'load', initMap);
