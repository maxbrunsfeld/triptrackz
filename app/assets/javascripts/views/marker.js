views.Marker = Backbone.View.extend({

  initialize: function(options) {
    this.model = options.model;

    this.marker = new google.maps.Marker({
      map: options.mapView.map,
      draggable: true
    });

    google.maps.event.addListener(
      this.marker,
      "dragend",
      _.bind(this.markerMoved, this)
    );

    this.model.on("change", this.moveMarker, this);
  },

  moveMarker: function() {
    this.marker.setPosition(this.model.points[0]);
  },

  markerMoved: function(e) {
    var position = e.latLng;
    this.model.setPoints([ position ]);
  }
});