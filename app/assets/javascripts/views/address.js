views.Address = Backbone.View.extend({

  events: {
    "click button[name='go']": "formSubmitted"
  },

  formSubmitted: function(e) {
    e.preventDefault();
    var inputs = this.$("input");
    var geocoder = new google.maps.Geocoder();

    this.numLocations = inputs.length;
    this.locations = [];
    var callback = _.bind(this.locationReceived, this);
    _.each(inputs, function(input) {
      geocoder.geocode({ address: $(input).val() }, callback);
    });
  },

  locationReceived: function(data, status) {
    this.locations.push(data[0].geometry.location);
    if (this.locations.length === this.numLocations) {
      this.allLocationsReceived();
    }
  },

  allLocationsReceived: function() {
    this.model.setPoints(this.locations);
  }

});
