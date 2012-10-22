views.MarkerSet = Backbone.View.extend({
  
  initialize: function(options) {
    this.mapView = options.mapView;
    this.collection.on("reset", this.drawMarkers, this);
    this.collection.on("select", this.modelSelected, this);
  },
  
  drawMarkers: function() {
    _.each(this.markers, function(oldMarker) {
      oldMarker.remove();
    });

    this.markers = this.collection.map(function(tripclip) {
      return new views.Marker({
        model: tripclip.point,
        mapView: this.mapView,
        readOnly: true
      });
    }, this);
  },

  modelSelected: function(model) {
    _.each(this.markers, function(marker) {
      if (marker.model === model.point) {
        marker.select();
      } else {
        marker.deselect();
      }
    });
  }
  
});