google.backdoor = {

  allMaps: [],
  allGeocodeRequests: [],

  initalizeMap: function(map) {
    this.allMaps.push(map);
  },

  geocode: function(options, callback) {
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
  }

};
