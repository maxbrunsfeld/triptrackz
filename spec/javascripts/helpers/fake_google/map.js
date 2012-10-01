google.maps.Map = function(el, options) {
  this.el = el;
  this.options = options;
  this.center = options.center;
  google.backdoor.initalizeMap(this);
};

_.extend(google.maps.Map.prototype, {

  setCenter: function(latLng) {
    this.center = latLng;
  }

});
