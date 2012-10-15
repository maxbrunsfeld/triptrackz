describe("views.Marker", function() {
  var view, mapView, model, marker;

  beforeEach(function() {
    model = new models.Region();
    mapView = new views.Map({ model: model });
    view = new views.Marker({ mapView: mapView, model: model });
    marker = google.backdoor.allMarkers[0];
  });

  describe("#initialize", function() {
    it("creates a marker", function() {
      expect(google.backdoor.allMarkers.length).to.eql(1);
    });

    it("associates the marker with the given map view's google map", function() {
      expect(marker.getMap()).to.equal(mapView.map);
    });

    it("does not show the marker yet", function() {
      expect(marker.getPosition()).to.be.undefined;
    });

    it("makes the marker draggable", function() {
      expect(marker.getDraggable()).to.eql(true);
    });
  });

  describe("when the model changes", function() {
    it("updates the position of the marker", function() {
      var position = new google.maps.LatLng(34, 102);
      model.setPoints([position]);
      expect(marker.getPosition()).to.eql(position)
    });
  });

  describe("when the marker is dragged by the user", function() {
    it("updates the model with the marker's new position", function() {
      var newPosition = new google.maps.LatLng(50, -150);
      var fakeDragEvent = { latLng: newPosition };

      google.maps.event.trigger(marker, "dragend", fakeDragEvent);

      expect(model.points).to.eql([ newPosition ]);
    });
  });
});