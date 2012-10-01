google.maps.DirectionsRenderer = $.noop;

_.extend(google.maps.DirectionsRenderer.prototype, {

  setMap: function(map) {
    this.map = map;
  },

  setDirections: function(data) {
    if (!this.map) { throw "No map for directions renderer!"; }
    this.data = data;
  }

});

