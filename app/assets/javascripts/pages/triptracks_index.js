pages.TriptracksIndex = function(options) {
  this.points = [new models.Point(), new models.Point()];
  this.region = new models.Region({ points: this.points });
  this.triptracks = new collections.Triptracks([], { region: this.region });

  this.region.on("change", function() {
    this.triptracks.fetch({ add: true });
  }, this);

  this.map = new views.Map({
    el: options.mapEl,
    model: this.region
  });
  this.address = new views.Address({
    el: options.addressEl,
    models: this.points
  });
  this.triptracksList = new views.TriptracksList({
    collection: this.triptracks,
    el: options.listEl
  });
  this.markerSet = new views.MarkerSet({
    collection: this.triptracks,
    mapView: this.map
  });
};