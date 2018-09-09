function ViewModel() {
  let self = this;
  let locations = [];
  let removedLocations = [];

  for (var i = 0; i < placeResults.length; i++) {
    locations.push(new Place(placeResults[i]));
  }

  self.places = ko.observableArray(locations);
  self.error = ko.observable(error);
  self.filterInput = ko.observable('');

  // Info window observables
  self.infoTitle = ko.observable('')
  self.infoImg = ko.observable('')
  self.infoDescription = ko.observable('')

  self.displayInfoWindow = function(item) {
    // Get information about clicked item from wikipedia api.
    if (!item.name) {
      // this procedure gets the proper model when a marker is clicked.
      item = self.places().find(o => o.id == item);
    }

    self.infoTitle(item.name)

    if (!item.info.description && !item.info.image) {

    } else {
      self.infoImg(item.info.image)
      self.infoDescription(item.info.description)
    }

    $('#locationInfo').fadeIn('slow', function() {})
    console.log(item);
  }

  self.hideInfoWindow = function() {
    $('#locationInfo').fadeOut('slow', function() {})
  }

  self.filterResults = function() {
    // Filter current list of locations

    deleteMarkers(); // delete all markers from the map.
    restoreRemoved(); // restore any previously removed items

    if (self.filterInput().length == 0) {
      // if input is empty, do nothing
      return null;
    }

    // remove locations that don't match the input.
    //  store them to be added back in later.
    removedLocations = self.places.remove(function (item) {
      return !item.name.toLowerCase().includes(self.filterInput().toLowerCase());
    });

    // Create map markers based on the new filtered array
    createMarkers(self.places(), function() {});

    function restoreRemoved() {
      // restore removed locations
      if (removedLocations.length > 0) {
        for (var i = 0; i < removedLocations.length; i++) {
          self.places.push(removedLocations[i]);
        }
      }
    }

    console.log("Filtered: " + self.filterInput());
    return null;
  }

}

var vm; // store the viewmodel here for use with JS

function afterMapInit(callback) {
  vm = new ViewModel();
  ko.applyBindings(vm);
  callback();
}
