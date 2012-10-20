pages.TripclipsIndex = function(options) {
  this.points = [new models.Point(), new models.Point()];
  this.region = new models.Region({ points: this.points });
  this.tripclips = new collections.Tripclips({ region: this.region });

  this.region.on("change", this.tripclips.fetch, this.tripclips);

  this.map = new views.Map({
    el: options.mapEl,
    model: this.region
  });
  this.address = new views.Address({
    el: options.addressEl,
    models: this.points
  });
};