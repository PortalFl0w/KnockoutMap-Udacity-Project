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

  self.displayInfoWindow = function(item) {
    // Get information about clicked item from wikipedia api.
    console.log("clicked inside vm");
    console.log(item);
  }

  self.filterResults = function() {
    // Filter current list of locations
    restoreRemoved();

    if (self.filterInput().length == 0) {
      return null;
    }

    removedLocations = self.places.remove(function (item) {
      return !item.name.toLowerCase().includes(self.filterInput().toLowerCase());
    });

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
