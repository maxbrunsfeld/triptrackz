describe("views.MarkerSet", function() {
  var view, mapView, collection;

  beforeEach(function() {
    collection = new collections.Trips();
    mapView = new views.Map({ model: new models.Region() });
    view = new views.MarkerSet({ mapView: mapView, collection: collection });
  });

  describe("when a model is added to the collection", function() {
    beforeEach(function() {
      collection.add([
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

    it("makes a marker view for the trip", function() {
      expect(view.markers.length).to.equal(2);
      expect(view.markers[0].model).to.equal(collection.at(0).point);
      expect(view.markers[1].model).to.equal(collection.at(1).point);
    });

    it("does not make the markers editable", function() {
      expect(view.markers[0].readOnly).to.be.true;
      expect(view.markers[1].readOnly).to.be.true;
    });

    describe("when a marker is clicked", function() {
      it("selects the corresponding model in the collection", function() {
        google.maps.event.trigger(view.markers[1].marker, "click");
        expect(collection.selectedModel).to.equal(collection.at(1));

        google.maps.event.trigger(view.markers[0].marker, "click");
        expect(collection.selectedModel).to.equal(collection.at(0));
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