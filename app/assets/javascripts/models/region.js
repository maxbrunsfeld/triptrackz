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

    southwestCorner: function() {
      if (this.points.length > 1) {
        return new google.maps.LatLng(
          _.min(this.latitudes()),
          _.min(this.longitudes())
        );
      } else {
        return new google.maps.LatLng(
          this.points[0].lat() - PADDING,
          this.points[0].lng() - PADDING
        );
      }
    },

    northeastCorner: function() {
      if (this.points.length > 1) {
        return new google.maps.LatLng(
          _.max(this.latitudes()),
          _.max(this.longitudes())
        );
      } else {
        return new google.maps.LatLng(
          this.points[0].lat() + PADDING,
          this.points[0].lng() + PADDING
        );
      }
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
