models.Tripclip = Backbone.Model.extend({

  url: "/tripclips",

  initialize: function(attrs) {
    this.region = attrs && attrs.region;
  },

  toJSON: function() {
    return {
      name: this.get("name"),
      latitude: this.region.latitudes()[0],
      longitude: this.region.longitudes()[0],
      address: this.region.addresses[0]
    };
  }

});