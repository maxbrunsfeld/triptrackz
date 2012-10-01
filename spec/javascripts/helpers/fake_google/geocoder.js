google.maps.Geocoder = $.noop;

_.extend(google.maps.Geocoder.prototype, {

  geocode: function(options, callback) {
    google.backdoor.geocode(options, callback);
  }

});
