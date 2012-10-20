google.maps.LatLngBounds = function(sw, ne) {
  this.sw = sw;
  this.ne = ne;
};

_.extend(google.maps.LatLngBounds.prototype, {

  getNorthEast: function() {
    return this.ne;
  },

  getSouthWest: function() {
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
    if (!(other instanceof google.maps.LatLngBounds)) return false;
    return (
      this.getNorthEast().equals(other.getNorthEast()) &&
      this.getSouthWest().equals(other.getSouthWest())
    );
  }
  
});