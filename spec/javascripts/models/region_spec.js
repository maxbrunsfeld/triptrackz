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

    describe("#southwestCorner and #northeastCorner", function() {
      it("returns the boundaries of the region", function() {
        expect(model.southwestCorner()).to.eql(new google.maps.LatLng(1, 0));
        expect(model.northeastCorner()).to.eql(new google.maps.LatLng(4, 2));
      });
    });
  });

  describe("when only one point has been set", function() {
    beforeEach(function() {
      var point = new google.maps.LatLng(1, 2);
      model.setPoints([point]);
    });

    describe("#southwestCorner and northeastCorner", function() {
      it("leaves some padding around the point", function (){
        expect(model.southwestCorner()).to.eql(new google.maps.LatLng(0.975, 1.975));
        expect(model.northeastCorner()).to.eql(new google.maps.LatLng(1.025, 2.025));
      });
    });
  });
});
