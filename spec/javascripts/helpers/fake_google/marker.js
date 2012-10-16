google.maps.Marker = function(options) {
  this.options = options;
  google.backdoor.markerCreated(this);
};

_.extend(google.maps.Marker.prototype, {
  getMap: function() {
    return this.options.map;
  },

  setPosition: function(position) {
    this.options.position = position;
  },

  getPosition: function() {
    return this.options.position;
  },

  getDraggable: function() {
    return this.options.draggable;
  }
});