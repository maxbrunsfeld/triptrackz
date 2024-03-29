collections.Trips = Backbone.Collection.extend({
  model: models.Trip,

  initialize: function(models, options) {
    options || (options = {});
    this.region = options.region;
  },

  url: function() {
    var boundaries = this.region.boundaries,
      north = boundaries.getNorthEast().lat(),
      south = boundaries.getSouthWest().lat(),
      east = boundaries.getNorthEast().lng(),
      west = boundaries.getSouthWest().lng();

    return "/trips?" + [
      "north=" + north,
      "south=" + south,
      "east=" + east,
      "west=" + west
    ].join("&");
  },

  selectModel: function(model) {
    this.selectedModel = model;
    this.trigger("select", model);
  }
});
