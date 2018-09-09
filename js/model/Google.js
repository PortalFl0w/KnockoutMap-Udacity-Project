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
    zoom: 17
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
        createMarkers(placeResults, function() {});
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
      lat: arr[i].geometry.location.lat(),
      lng: arr[i].geometry.location.lng()
    }
    var marker = new google.maps.Marker({
      id: arr[i].place_id,
      position: pos,
      map: map,
      title: arr[i].name,
      animation: google.maps.Animation.DROP
    })
    marker.addListener('mouseover', function() {
      this.setAnimation(google.maps.Animation.BOUNCE);
    })
    marker.addListener('mouseout', function() {
      this.setAnimation(null);
    })
    marker.addListener('click', function() {
      vm.displayInfoWindow(this)
    });
    markers.push(marker);
  }
  callback();
}

// TODO:
//  List of locations into side nav -- DONE
//  Each location needs to display information about itself.
//  Filter Places with a text field -- DONE
//  Style Markers when clicked
//  Display all location markers by default -- DONE
//  Clicking on a marker displays more information about it.
//  Use wikipedia API to find additional info about places. Display in DOM.
