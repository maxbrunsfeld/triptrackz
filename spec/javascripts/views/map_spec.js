describe("views.Map", function() {
  var el, view, model;

  beforeEach(function() {
    el = document.createElement("div");
    model = new models.Region({ points: [] });
    view = new views.Map({ el: el, model: model });
  });

  describe("#initialize", function() {
    it("creates one google map", function() {
      expect(google.backdoor.allMaps.length).to.eql(1);
      expect(view.map).to.equal(google.backdoor.allMaps[0]);
    });

    it("creates a google map with the view's element", function() {
      expect(view.map.el).to.equal(el);
    });

    it("centers the map on the united states", function() {
      var denverLat = 39.74;
      var denverLng = -104.9842;

      var center = view.map.options.center;
      expect(center).to.be.an.instanceOf(google.maps.LatLng);
      expect(center.lat()).to.be.closeTo(denverLat, 1);
      expect(center.lng()).to.be.closeTo(denverLng, 1);
    });

    it("sets a reasonable zoom level and map type", function() {
      expect(view.map.options.zoom).to.be.within(3, 6);
      expect(view.map.options.mapTypeId).to.equal(google.maps.MapTypeId.ROADMAP);
    });
  });

  describe("when the model changes its boundaries", function() {
    var bounds, viewBounds;

    beforeEach(function() {
      viewBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(37, -105),
        new google.maps.LatLng(40, -102)
      );
      sinon.stub(view.map, "getBounds", function() {
        return viewBounds;
      });

      bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(38, -104),
        new google.maps.LatLng(39, -103)
      );
      model.boundaries = bounds;
      model.trigger("change");
    });

    it("re-centers the map at the given coordinates", function() {
      expect(view.map.fitBounds).to.have.been.calledWith(bounds);
    });

    it("sets the map's boundaries on the model", function() {
      expect(model.boundaries).to.eql(viewBounds);
    });

    describe("when the map's boundaries change", function() {
      var changeSpy;

      beforeEach(function() {
        changeSpy = sinon.spy();
        model.on("change", changeSpy);
        viewBounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(40, -104),
          new google.maps.LatLng(41, -103)
        );
        google.maps.event.trigger(view.map, "bounds_changed");
      });

      it("updates the model's boundaries", function() {
        expect(model.boundaries).to.eql(viewBounds);
      });

      it("triggers change event of the model", function(){
        expect(changeSpy).to.have.been.called;
      })
    });
  });

});
