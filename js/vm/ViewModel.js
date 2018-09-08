function ViewModel() {
  let self = this;
  let places = [];

  for (var i = 0; i < placeResults.length; i++) {
    places.push(new Place(placeResults[i]));
  }

  self.places = ko.observableArray(places);
  self.error = ko.observable(error);
  self.markers = ko.observableArray(markers);

  self.displayInfo = function(item) {
    console.log("clicked");
    console.log(item);
  }

}

function afterMapInit() {
  ko.applyBindings(new ViewModel());
}
