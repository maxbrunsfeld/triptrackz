pages.TripclipsNew = function(options) {
  this.tripclip = new models.Tripclip()
  this.point = this.tripclip.point;
  this.region = new models.Region({ points: [this.point] });

  this.soundcloudTrackSearch = new views.SoundcloudTrackSearch({
    el: options.modalEl
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
  this.form = new views.TripclipForm({
    el: options.tripclipFormEl,
    model: this.tripclip
  });
};