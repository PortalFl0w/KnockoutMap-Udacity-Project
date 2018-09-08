function ViewModel() {
  let self = this;
  let places = [];

  for (var i = 0; i < placeResults.length; i++) {
    places.push(new Place(placeResults[i]));
  }

  self.places = ko.observableArray(places);
  self.error = ko.observable(error);

  self.displayInfoWindow = function(item) {
    // Get information about clicked item from wikipedia api.
    console.log("clicked inside vm");
    console.log(item);
  }

}

var vm; // store the viewmodel here for use with JS

function afterMapInit(callback) {
  vm = new ViewModel();
  ko.applyBindings(vm);
  callback();
}
