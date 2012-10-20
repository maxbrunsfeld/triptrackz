collections.Tripclips = Backbone.Collection.extend({
  model: models.Tripclip,

  initialize: function(options) {
    this.region = options.region;
  },

  url: function() {
    var boundaries = this.region.boundaries,
      north = boundaries.getNorthEast().lat(),
      south = boundaries.getSouthWest().lat(),
      east = boundaries.getNorthEast().lng(),
      west = boundaries.getSouthWest().lng();

    return "/tripclips?" + [
      "north=" + north,
      "south=" + south,
      "east=" + east,
      "west=" + west
    ].join("&");
  }
});
