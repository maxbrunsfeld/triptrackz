(function() {

  var GEOCODER = new google.maps.Geocoder();
  var PADDING = 0.025;

  models.Region = Backbone.Model.extend({
    setPoints: function(points) {
      this.points = points;
      this.addresses = [];

      var callback = _.bind(this.addressReceived, this);
      _.each(this.points, function(point) {
        GEOCODER.geocode({ location: point }, callback);
      });
    },

    setAddresses: function(addresses) {
      this.addresses = addresses;
      this.points = [];

      var callback = _.bind(this.locationReceived, this);
      _.each(this.addresses, function(address) {
        GEOCODER.geocode({ address: address }, callback);
      });
    },

    addressReceived: function(data) {
      this.addresses.push(data[0].formatted_address);
      this.geocodeReceived();
    },

    locationReceived: function(data) {
      this.points.push(data[0].geometry.location);
      this.geocodeReceived();
    },

    geocodeReceived: function() {
      if (this.points.length === this.addresses.length) {
        this.trigger("change");
      }
    },

    boundaries: function() {
      var sw, ne;
      if (this.points.length === 1) {
        ne = new google.maps.LatLng(
          this.points[0].lat() + PADDING,
          this.points[0].lng() + PADDING
        );
        sw = new google.maps.LatLng(
          this.points[0].lat() - PADDING,
          this.points[0].lng() - PADDING
        );
      } else {
        sw = new google.maps.LatLng(
          _.min(this.latitudes()),
          _.min(this.longitudes())
        );
        ne = new google.maps.LatLng(
          _.max(this.latitudes()),
          _.max(this.longitudes())
        );
      }

      return new google.maps.LatLngBounds(sw, ne);
    },

    latitudes: function() {
      return _.map(this.points, function(point) {
        return point.lat();
      });
    },

    longitudes: function() {
      return _.map(this.points, function(point) {
        return point.lng();
      });
    }
  });

})();
