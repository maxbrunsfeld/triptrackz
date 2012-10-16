(function() {

  var GEOCODER = new google.maps.Geocoder();

  models.Point = Backbone.Model.extend({
    setLocation: function(location) {
      this.location = location;

      var self = this;
      GEOCODER.geocode({ location: location }, function(data) {
        self.address = data[0].formatted_address;
        self.trigger("change");
      });
    },

    setAddress: function(address) {
      this.address = address;

      var self = this;
      GEOCODER.geocode({ address: address }, function(data) {
        self.location = data[0].geometry.location;
        self.trigger("change");
      });
    }
  });

})();
