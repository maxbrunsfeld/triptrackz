google.maps.Map = function(el, options) {
  this.el = el;
  this.options = options;
  google.backdoor.mapCreated(this);
};

_.extend(google.maps.Map.prototype, {

  setCenter: sinon.spy(),
  fitBounds: sinon.spy(),

  getCenter: function() {
    return this.options.center;
  }

});
