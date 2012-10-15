google.maps.LatLngBounds = function(sw, ne) {
  this.sw = sw;
  this.ne = ne;
};

_.extend(google.maps.LatLngBounds.prototype, {

  getNortheast: function() {
    return this.ne;
  },

  getSouthwest: function() {
    return this.sw;
  }
  
});