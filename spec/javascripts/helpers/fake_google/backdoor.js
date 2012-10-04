google.backdoor = {

  allMaps: [],
  allGeocodeRequests: [],

  initalizeMap: function(map) {
    this.allMaps.push(map);
    this.showMapState(map);
  },

  showMapState: function(map) {
    $(map.el).text(JSON.stringify({
      center: map.options.center,
      directions: map.directionsData
    }));
  },

  routeDirections: function(directionsService) {
    $.ajax("/specs/directions", {
      data: {
        origin: options.origin,
        destination: options.destination
      },

      success: callback
    });
  },

  distance: function(start, end) {
    var dx = end.lat() - start.lat();
    var dy = end.lng() - start.lng();
    return Math.sqrt(dx * dx + dy * dy);
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
