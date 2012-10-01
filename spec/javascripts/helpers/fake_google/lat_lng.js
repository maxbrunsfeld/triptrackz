(function() {

  google.maps.LatLng = function(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  };

  _.extend(google.maps.LatLng.prototype, {

    distanceTo: function(other) {
      var dx = other.lat - this.lat;
      var dy = other.lng - this.lng;
      return Math.sqrt(dx * dx + dy * dy);
    }

  });

})();
