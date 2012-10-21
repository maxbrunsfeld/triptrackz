(function() {

  var GEOCODER = new google.maps.Geocoder();

  models.Point = Backbone.Model.extend({
    location: function() {
      return this.get("location");
    },

    address: function() {
      return this.get("address");
    },

    setLocation: function(location) {
      this.clear();

      var self = this;
      GEOCODER.geocode({ location: location }, function(data) {
        self.set({
          location: location,
          address: data[0].formatted_address
        });
      });
    },

    setAddress: function(address) {
      this.clear();

      var self = this;
      GEOCODER.geocode({ address: address }, function(data) {
        self.set({
          location: data[0].geometry.location,
          address: address
        });
      });
    },

    isPending: function() {
      return !this.has("location");
    }
  });

})();
