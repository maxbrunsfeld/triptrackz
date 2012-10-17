pages.TripclipsNew = function(options) {
  this.point = new models.Point();
  this.region = new models.Region({ points: [this.point] });
  this.tripclip = new models.Tripclip({ point: this.point })

  this.map = new views.Map({
    el: options.mapEl,
    model: this.region
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