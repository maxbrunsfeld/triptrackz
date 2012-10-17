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
  },

  // won't work with boundaries that cross 180 degrees longitude
  contains: function(point) {
    return (
      this.ne.lat() >= point.lat() &&
      this.ne.lng() >= point.lng() &&
      this.sw.lat() <= point.lat() &&
      this.sw.lng() <= point.lng()
    );
  },

  equals: function(other) {
    return (
      this.getNortheast().equals(other.getNortheast()) &&
      this.getSouthwest().equals(other.getSouthwest())
    );
  }
  
});