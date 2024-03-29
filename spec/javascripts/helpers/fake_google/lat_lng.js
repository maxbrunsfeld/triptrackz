google.maps.LatLng = function(lat, lng) {
  this._lat = lat;
  this._lng = lng;
};

_.extend(google.maps.LatLng.prototype, {

  lat: function() {
    return this._lat;
  },

  lng: function() {
    return this._lng;
  },

  equals: function(other) {
    if (!(other instanceof google.maps.LatLng)) return false;
    return (
      this.lat() === other.lat() &&
      this.lng() === other.lng()
    );
  }

});

