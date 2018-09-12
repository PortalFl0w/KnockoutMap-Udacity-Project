var map;
var error = null;
var placeResults = [];
var markers = [];
var startingPos = {lat: 51.501021, lng: -0.12252}

function initMap() {
  // initialize the map
  // This function initializes the map, and searches for nearby places.
  // After init, it calls the necessary functions that enable functionality.

  map = new google.maps.Map(document.getElementById('map'), {
    center: startingPos,
    zoom: 15
  });

  nearby(startingPos);

}

function nearby(pos) {
  var search = {
    location: pos,
    radius: '500'
  }
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(search, function(results, status) {
    // status = "FAILLLL"
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        results[i].place_id = i;
        placeResults.push(results[i]);
      }
      afterMapInit(function() {
        createMarkers(vm.places(), function() {});
      });
    } else {
      error = "Failed to search nearby places. Try Refreshing the page."
      console.log(error);
      afterMapInit(function() {});
    }
  });
}

function createMarkers(arr, callback) {
  for (var i = 0; i < arr.length; i++) {
    let pos = {
      lat: arr[i].lat,
      lng: arr[i].lng
    }
    var marker = new google.maps.Marker({
      id: arr[i].id,
      position: pos,
      map: map,
      title: arr[i].name,
      animation: google.maps.Animation.DROP
    })
    marker.addListener('click', function() {
      deanimateMarkers();
      vm.displayInfoWindow(this.id)
      this.setAnimation(google.maps.Animation.BOUNCE);
    });
    markers.push(marker);
  }
  callback();
}

function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function deanimateMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setAnimation(null);
  }
}

function animateMarker(id) {
  for (var i = 0; i < markers.length; i++) {
    if (markers[i].id == id) {
      markers[i].setAnimation(google.maps.Animation.BOUNCE);
    }
  }
}

function deleteMarkers() {
  setMapOnAll(null);
  markers = [];
}

function googleError() {
  $("#map").text("Unable to reach Google Maps")
}
