describe("views.MarkerSet", function() {
  var view, mapView, collection;

  beforeEach(function() {
    collection = new collections.Tripclips();
    mapView = new views.Map({ model: new models.Region() });
    view = new views.MarkerSet({ mapView: mapView, collection: collection });
  });

  describe("when the collection changes", function() {
    beforeEach(function() {
      collection.reset([
        {
          latitude: 1,
          longitude: 2,
          address: "466 37th St #6",
          id: 45
        },
        {
          latitude: 3,
          longitude: 4,
          address: "466 37th St #5",
          id: 56
        }
      ]);
    });

    it("makes a marker view for each tripclip in the collection", function() {
      expect(view.markers.length).to.equal(2);
      expect(view.markers[0].model).to.equal(collection.at(0).point);
      expect(view.markers[1].model).to.equal(collection.at(1).point);
    });

    it("does not make the markers editable", function() {
      expect(view.markers[0].readOnly).to.be.true;
      expect(view.markers[1].readOnly).to.be.true;
    });

    it("removes any previous markers", function() {
      var oldMarkers = view.markers;
      _.each(oldMarkers, function(oldMarker) {
        sinon.spy(oldMarker, "remove");
      });

      collection.reset([
        {
          latitude: 5,
          longitude: 6,
          address: "466 37th St #4"
        }
      ]);

      _.each(oldMarkers, function(oldMarker) {
        expect(oldMarker.remove).to.have.been.called;
      });
    });

    describe("when a model in the collection is selected", function() {
      it("marks that model's view as selected", function() {
        sinon.spy(view.markers[1], "select");
        collection.selectModel(collection.at(1));
        expect(view.markers[1].select).to.have.been.called;
      });

      it("marks the other views as deselected", function() {
        sinon.spy(view.markers[0], "deselect");
        collection.selectModel(collection.at(1));
        expect(view.markers[0].deselect).to.have.been.called;
      });
    });
  });
});