pages.TriptracksNew = function(options) {
  this.triptrack = new models.Triptrack()
  this.point = this.triptrack.point;
  this.region = new models.Region({ points: [this.point] });

  this.soundcloudTrackSearch = new views.SoundcloudTrackSearch({
    el: options.modalEl,
    triptrack: this.triptrack
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
  this.form = new views.TriptrackForm({
    el: options.triptrackFormEl,
    model: this.triptrack
  });

  this.soundcloudTracksList = new views.SoundcloudTracksList({
    collection: this.triptrack.soundcloudTracks,
    el: options.tracksListEl

  });
};