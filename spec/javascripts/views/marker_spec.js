describe("views.Marker", function() {
  var view, mapView, model, marker;

  beforeEach(function() {
    model = new models.Point();
    mapView = new views.Map({ model: new models.Region({}) });
    view = new views.Marker({ mapView: mapView, model: model });
  });

  describe("#initialize", function() {
    it("creates a marker", function() {
      expect(google.backdoor.allMarkers.length).to.eql(1);
      expect(view.marker).to.equal(google.backdoor.allMarkers[0]);
    });

    it("associates the marker with the given map view's google map", function() {
      expect(view.marker.getMap()).to.equal(mapView.map);
    });

    it("does not show the marker yet", function() {
      expect(view.marker.getPosition()).to.be.undefined;
    });

    it("makes the marker draggable", function() {
      expect(view.marker.getDraggable()).to.eql(true);
    });
  });

  describe("when the model changes", function() {
    it("updates the position of the marker", function() {
      var location = new google.maps.LatLng(34, 102);
      model.setLocation(location);
      model.trigger("change");

      expect(view.marker.getPosition()).to.eql(location)
    });
  });

  describe("when the marker is dragged by the user", function() {
    it("updates the model with the marker's new position", function() {
      var location = new google.maps.LatLng(50, -150);
      var fakeDragEvent = { latLng: location };

      google.maps.event.trigger(view.marker, "dragend", fakeDragEvent);

      expect(model.location).to.equal(location);
    });
  });
});