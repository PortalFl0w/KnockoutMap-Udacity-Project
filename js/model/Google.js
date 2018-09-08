var map;
var error = null;
var placeResults = [];
var markers = [];
var startingPos = {lat: 51.501021, lng: -0.12252}
// var startingPos = {lat: 51, lng: 0}

function initMap() {
  // initialize the map
  // This function initializes the map, and searches for nearby places.
  // After init, it calls the necessary functions that enable functionality.

  map = new google.maps.Map(document.getElementById('map'), {
    center: startingPos,
    zoom: 17
  });

  var search = {
    location: startingPos,
    radius: '500'
  }
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(search, function(results, status) {
    // status = "FAILLLL"
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        placeResults.push(results[i]);
      }
      createMarkers(placeResults, function() {
        afterMapInit();
      });
    } else {
      error = "Failed to search nearby places. Try Refreshing the page."
      console.log(error);
      afterMapInit();
    }
  });
}

function createMarkers(arr, callback) {
  for (var i = 0; i < arr.length; i++) {
    let pos = {
      lat: arr[i].geometry.location.lat(),
      lng: arr[i].geometry.location.lng()
    }
    var marker = new google.maps.Marker({
      position: pos,
      map: map,
      title: arr[i].name
    })
    markers.push(marker);
  }
  callback();
}

// TODO:
//  List of locations into side nav -- DONE
//  Each location needs to display information about itself.
//  Display all location markers by default -- DONE
//  Clicking on a marker displays more information about it.
//  Use wikipedia API to find additional info about places. Display in DOM.
