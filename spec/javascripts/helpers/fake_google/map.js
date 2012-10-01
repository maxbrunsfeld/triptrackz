google.maps.Map = function(el, options) {
  this.el = el;
  this.options = options;
  google.backdoor.initalizeMap(this);
};
