describe("models.Region", function() {
  var model;

  beforeEach(function() {
    model = new models.Region();
  });

  describe("#setPoints", function() {
    it("triggers the 'change' event", function() {
      var spy = sinon.spy();
      model.on("change", spy);

      model.setPoints([
        new google.maps.LatLng(1, 2),
        new google.maps.LatLng(4, 0)
      ]);

      expect(spy).to.have.been.called;
    });
  });

  describe("when endpoints have been set", function() {
    beforeEach(function() {
      var start = new google.maps.LatLng(1, 2);
      var end = new google.maps.LatLng(4, 0);
      model.setPoints([start, end]);
    });

    describe("#southwestCorner", function() {
      it("returns the location of the southwest corner", function() {
        expect(model.southwestCorner()).to.eql(new google.maps.LatLng(1, 0));
      });
    });

    describe("#northeastCorner", function() {
      it("returns the location of the northeast corner", function() {
        expect(model.northeastCorner()).to.eql(new google.maps.LatLng(4, 2));
      });
    });
  });

});
