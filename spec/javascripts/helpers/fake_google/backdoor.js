google.backdoor = {

  allMaps: [],
  allMarkers: [],
  allGeocodeRequests: [],

  mapCreated: function(map) {
    this.allMaps.push(map);
  },

  markerCreated: function(marker) {
    this.allMarkers.push(marker);
  },

  geocodeRequested: function(options, callback) {
    this.allGeocodeRequests.push({
      options: options,
      callback: callback
    });
  },

  completeGeocodeRequest: function(request, location) {
    var data = [
      {
        geometry: {
          location: location
        }
      }
    ];

    request.callback(data, "OK");
  },

  clear: function() {
    google.backdoor.allGeocodeRequests = [];
    google.backdoor.allMaps = [];
    google.backdoor.allMarkers = [];
  }

};