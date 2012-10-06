google.maps.Geocoder = function() {};

_.extend(google.maps.Geocoder.prototype, {

  geocode: function(options, callback) {
    google.backdoor.geocode(options, callback);
  }

});
