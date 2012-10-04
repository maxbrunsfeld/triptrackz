describe("models.Route", function() {
  var model;

  beforeEach(function() {
    model = new models.Route();
  });

  describe("#setEndpoints", function() {
    it("triggers the 'change' event", function() {
      var spy = sinon.spy();
      model.on("change", spy);

      model.setEndpoints(
        new google.maps.LatLng(1, 2),
        new google.maps.LatLng(4, 0)
      );

      expect(spy).to.have.been.called
    });
  });

  describe("when endpoints have been set", function() {
    beforeEach(function() {
      var start = new google.maps.LatLng(1, 2);
      var end = new google.maps.LatLng(4, 0);

      model.setEndpoints(start, end);
    });

    describe("#midpoint", function() {
      it("returns the midpoint of the route", function() {
        var mid = new google.maps.LatLng(2.5, 1);
        expect(model.midpoint()).to.eql(mid);
      });
    });

    describe("#boundaries", function() {
      it("returns SW and NE corners for the route, with some padding", function() {
        var sw = model.boundaries().sw;
        var ne = model.boundaries().ne;

        expect(sw.lat()).to.be.lessThan(1);
        expect(sw.lng()).to.be.lessThan(0);
        expect(ne.lat()).to.be.greaterThan(4);
        expect(ne.lng()).to.be.greaterThan(2);
      });
    });

    describe("#width", function() {
      it("returns the width of the map, including some padding", function() {
        expect(model.width()).to.be.within(2, 2.3);
      });
    });

    describe("#height", function() {
      it("returns the height of the map, including some padding", function() {
        expect(model.height()).to.be.within(3, 3.4);
      });
    });
  });

});
