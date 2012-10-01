views.RoutePage = Backbone.View.extend({

  events: {
    "click button[name='go']": "formSubmitted"
  },

  initialize: function(options) {
    this.mapView = options.mapView;
  },

  formSubmitted: function(e) {
    e.preventDefault();
    var geocoder = new google.maps.Geocoder();
    var startInput = this.$("input[name='start']");
    geocoder.geocode({ address: startInput.val() }, _.bind(this.locationReceived, this))
  },

  locationReceived: function(data, status) {
    var location = data[0].geometry.location;
    this.mapView.centerMap(location);
  }

});
