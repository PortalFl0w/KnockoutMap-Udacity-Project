function ViewModel() {

  let self = this;

  let locations = [];
  let removedLocations = [];

  for (var i = 0; i < placeResults.length; i++) {
    // Generate places using the standard model.
    locations.push(new Place(placeResults[i]));
  }

  self.places = ko.observableArray(locations);  // Stores the current list of places
  self.error = ko.observable(error);  // Stores error string
  self.filterInput = ko.observable('');  // Follows the user input on the filter field.

  // Info window observables
  self.infoTitle = ko.observable('');
  self.info = ko.observableArray('');

  self.displayInfoWindow = function(item) {
    // Get information about clicked item from wikipedia api.
    if (!item.name) {
      // this procedure gets the proper model when a marker is clicked.
      item = self.places().find(o => o.id == item);
    }

    animateMarker(item.id); // animate the corresponding marker.

    self.infoTitle(item.name);

    if (item.info.length == 0) {
      // If this is the first time running this query.
      self.wikiSearch(item.name, function(err,r){

        if (err) {
          return self.error(r);
        }

        let itemWithInfo = item;
        itemWithInfo.info = r.query.search;
        self.places.replace(item, itemWithInfo);

        self.info(itemWithInfo.info);
      })
    } else {
      // If the query for this item was already run before, use the stored information instead of requesting the data again.
      self.info(item.info);
    }

    $('#locationInfo').fadeIn('slow', function() {})
  }

  self.hideInfoWindow = function() {
    deanimateMarkers();
    $('#locationInfo').fadeOut('slow', function() {})
  }

  self.filterResults = function() {
    // Filter current list of locations

    deleteMarkers(); // delete all markers from the map.
    restoreRemoved(); // restore any previously removed items
    removedLocations = []; // refresh the removed locations array.

    if (self.filterInput().length == 0) {
      // if input is empty, do nothing
      createMarkers(self.places(), function() {});
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

  self.wikiSearch = function(str, callback) {
    // Search Wikipedia for a string.
    // Returns values in callback.
    //   callback(error[bool], result[obj/str])
    console.log(str);
    $.ajax({
      url: 'http://en.wikipedia.org/w/api.php',
      data: {
        action: 'query',
        list: 'search',
        srsearch: str,
        format: 'json',
        formatversion: 2
      },
      dataType: 'jsonp',
      success: function (x) {
        console.log(x);
        callback(false, x);
      }
    }).fail(function(x) {
      console.error(x);
      callback(true, "Unable to retreive information about this location")
    });
  }

  self.wikiArticleUrlWithTags = function(id, inner) {
    // Returns an 'a' tag with the URL of the wikipedia article.
    return "<a href=\"https://en.wikipedia.org/?curid=" + id + "\" target=\"_blank\">" + inner + "</a>";
  }

}

var vm; // store the viewmodel globally for use with JS

function afterMapInit(callback) {
  // Initialize Knockout
  vm = new ViewModel();
  ko.applyBindings(vm);
  callback();
}
