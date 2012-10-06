google.maps.Map = function(el, options) {
  this.el = el;
  this.options = options;
  google.backdoor.initalizeMap(this);
};

_.extend(google.maps.Map.prototype, {

  setCenter: sinon.spy(),
  fitBounds: sinon.spy()

});
