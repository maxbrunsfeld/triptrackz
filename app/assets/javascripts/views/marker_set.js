views.MarkerSet = Backbone.View.extend({
  
  initialize: function(options) {
    this.mapView = options.mapView;
    this.collection.on("add", this.modelAdded, this);
    this.collection.on("select", this.modelSelected, this);
    this.markers = [];
  },
  
  modelAdded: function(model) {
    var marker = new views.Marker({
      model: model.point,
      mapView: this.mapView,
      readOnly: true
    });

    this.markers.push(marker);
    google.maps.event.addListener(
      marker.marker,
      "click",
      _.bind(this.markerClicked, this, model)
    );
  },

  modelSelected: function(model) {
    _.each(this.markers, function(marker) {
      if (marker.model === model.point) {
        marker.select();
      } else {
        marker.deselect();
      }
    });
  },

  markerClicked: function(model) {
    this.collection.selectModel(model);
  }
  
});