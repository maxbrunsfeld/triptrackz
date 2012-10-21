models.Tripclip = Backbone.Model.extend({

  url: "/tripclips",

  constructor: function(attrs, options) {
    this.point = new models.Point();
    return models.Tripclip.__super__.constructor.apply(this, arguments);
  },

  set: function(attrs) {
    if (attrs.latitude) {
      this.point.set({
        address: attrs.address,
        location: new google.maps.LatLng(
          attrs.latitude,
          attrs.longitude
        )
      });

      delete attrs.latitude;
      delete attrs.longitude;
      delete attrs.address;
    }

    return models.Tripclip.__super__.set.apply(this, arguments);
  },

  toJSON: function() {
    return {
      name: this.get("name"),
      latitude: this.point.location().lat(),
      longitude: this.point.location().lng(),
      address: this.point.address()
    };
  }

});