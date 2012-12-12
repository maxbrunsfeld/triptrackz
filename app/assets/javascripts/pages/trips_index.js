pages.TripsIndex = function(options) {
  this.points = [new models.Point(), new models.Point()];
  this.region = new models.Region({ points: this.points });
  this.trips = new collections.Trips([], { region: this.region });

  this.region.on("change", function() {
    this.trips.fetch({ add: true });
  }, this);

  this.map = new views.Map({
    el: options.mapEl,
    model: this.region
  });
  this.address = new views.Address({
    el: options.addressEl,
    models: this.points
  });
  this.tripsList = new views.TripsList({
    collection: this.trips,
    el: options.listEl
  });
  this.markerSet = new views.MarkerSet({
    collection: this.trips,
    mapView: this.map
  });
};