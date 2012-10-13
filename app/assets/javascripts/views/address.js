views.Address = Backbone.View.extend({

  events: {
    "click button[name='go']": "formSubmitted"
  },

  formSubmitted: function(e) {
    e.preventDefault();
    var startInput = this.$("input[name='start']");
    var endInput = this.$("input[name='end']");
    var geocoder = new google.maps.Geocoder();

    this.locations = [];
    var callback = _.bind(this.locationReceived, this);
    geocoder.geocode({ address: startInput.val() }, callback);
    geocoder.geocode({ address: endInput.val() }, callback);
  },

  locationReceived: function(data, status) {
    this.locations.push(data[0].geometry.location);
    if (this.locations.length === 2) {
      this.allLocationsReceived();
    }
  },

  allLocationsReceived: function() {
    this.model.setEndpoints(this.locations[0], this.locations[1]);
  }

});
