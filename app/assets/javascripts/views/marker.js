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
    this.deselect();
  },

  remove: function() {
    this.marker.setMap(null);
  },

  moveMarker: function() {
    this.marker.setPosition(this.model.location());
  },

  markerMoved: function(e) {
    this.model.setLocation(e.latLng);
  },

  select: function() {
    var pinColor = "0f0";
    this.marker.setIcon(
      new google.maps.MarkerImage(
        "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34))
    );
  },

  deselect: function() {
    var pinColor = "f00";
    this.marker.setIcon(
      new google.maps.MarkerImage(
        "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34))
    );
  }
});