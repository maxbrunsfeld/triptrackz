views.Marker = Backbone.View.extend({

  initialize: function(options) {
    this.model = options.model;
    this.mapView = options.mapView;
    this.readOnly = options.readOnly;

    this.marker = new google.maps.Marker({
      map: options.mapView.map,
      draggable: !this.readOnly
    });

    google.maps.event.addListener(
      this.marker,
      "dragend",
      _.bind(this.markerMoved, this)
    );

    this.model.on("change", this.moveMarker, this);
    this.moveMarker();
  },

  remove: function() {
    this.marker.setMap(null);
  },

  moveMarker: function() {
    this.marker.setPosition(this.model.location());
  },

  markerMoved: function(e) {
    this.model.setLocation(e.latLng);
  }
});