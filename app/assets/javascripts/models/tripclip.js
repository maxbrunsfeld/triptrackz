models.Tripclip = Backbone.Model.extend({

  url: "/tripclips",

  initialize: function(attrs) {
    this.point = attrs && attrs.point;
  },

  toJSON: function() {
    return {
      name: this.get("name"),
      latitude: this.point.location.lat(),
      longitude: this.point.location.lng(),
      address: this.point.address
    };
  }

});