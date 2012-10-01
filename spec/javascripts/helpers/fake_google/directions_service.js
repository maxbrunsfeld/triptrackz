google.maps.DirectionsService = $.noop;

_.extend(google.maps.DirectionsService.prototype, {

  route: function(options, callback) {
    google.backdoor.routeDirections(options, callback);
  }

});
