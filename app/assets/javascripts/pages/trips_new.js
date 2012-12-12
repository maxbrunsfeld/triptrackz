pages.TripsNew = function(options) {
  this.trip = new models.Trip()
  this.point = this.trip.point;
  this.region = new models.Region({ points: [this.point] });

  this.trackSearch = new views.TrackSearch({
    el: options.modalEl,
    trip: this.trip
  });
  this.map = new views.Map({
    el: options.mapEl,
    model: this.region
  });
  this.marker = new views.Marker({
    model: this.point,
    mapView: this.map
  });
  this.address = new views.Address({
    el: options.addressEl,
    models: [this.point]
  });
  this.form = new views.TripForm({
    el: options.tripFormEl,
    model: this.trip
  });

  this.tracksList = new views.TracksList({
    collection: this.trip.tracks,
    el: options.tracksListEl

  });
};