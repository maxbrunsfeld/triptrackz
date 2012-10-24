pages.TripclipsIndex = function(options) {
  this.points = [new models.Point(), new models.Point()];
  this.region = new models.Region({ points: this.points });
  this.tripclips = new collections.Tripclips({ region: this.region });

  this.region.on("change", function() {
    this.tripclips.fetch({ add: true });
  }, this);

  this.map = new views.Map({
    el: options.mapEl,
    model: this.region
  });
  this.address = new views.Address({
    el: options.addressEl,
    models: this.points
  });
  this.tripclipsList = new views.TripclipsList({
    collection: this.tripclips,
    el: options.listEl
  });
  this.markerSet = new views.MarkerSet({
    collection: this.tripclips,
    mapView: this.map
  });
};