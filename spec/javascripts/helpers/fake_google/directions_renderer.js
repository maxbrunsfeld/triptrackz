(function() {

  google.maps.DirectionsRenderer = $.noop;

  _.extend(google.maps.DirectionsRenderer.prototype, {

    setMap: function(googleMap) {
      this.googleMap = googleMap;
    },

    setDirections: function(data) {
      if (!this.googleMap) { throw "No map set on directions renderer!"; }
      this.data = data;
    }

  });

})();

