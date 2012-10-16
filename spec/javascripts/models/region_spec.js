describe("models.Region", function() {
  var model, point1, point2;

  beforeEach(function() {
    point1 = new models.Point();
    point2 = new models.Point();

    model = new models.Region({ points: [point1, point2] });

    point1.location = new google.maps.LatLng(0, 2);
    point2.location = new google.maps.LatLng(2, 0);
    point1.trigger("change");
    point2.trigger("change");
  });

  describe("when the points' locations are set", function() {
    context("when there are two points", function() {
      it("sets its boundaries to contain the points", function() {
        expect(model.boundaries).to.eql(new google.maps.LatLngBounds(
          new google.maps.LatLng(0, 0),
          new google.maps.LatLng(2, 2)
        ));
      });
    });

    context("when there is only one point", function() {
      beforeEach(function() {
        model = new models.Region({ points: [point1] });
        point1.trigger("change");
      });

      it("adjusts its boundaries with padding around the point", function() {
        expect(model.boundaries).to.eql(new google.maps.LatLngBounds(
          new google.maps.LatLng(-0.025, 1.975),
          new google.maps.LatLng(0.025, 2.025)
        ));
      });
    });
  });

  describe("when the points' locations change", function() {
    var changeSpy;

    beforeEach(function() {
      changeSpy = sinon.spy();
      model.on("change", changeSpy);
    });

    context("when the location is inside the current boundaries", function() {
      beforeEach(function() {
        point1.location = new google.maps.LatLng(0, 1);
        point1.trigger("change");
      });

      it("does not change its boundaries", function() {
        expect(model.boundaries).to.eql(new google.maps.LatLngBounds(
          new google.maps.LatLng(0, 0),
          new google.maps.LatLng(2, 2)
        ));
      });

      it("does not trigger the 'change' event", function() {
        expect(changeSpy).not.to.have.been.called;
      });
    });

    context("when the location is outside the current boundaries", function() {
      beforeEach(function() {
        point1.location = new google.maps.LatLng(0, 3);
        point1.trigger("change");
      });

      it("adjusts its boundaries again to fit all of the points", function() {
        expect(model.boundaries).to.eql(new google.maps.LatLngBounds(
          new google.maps.LatLng(0, 0),
          new google.maps.LatLng(2, 3)
        ));
      });

      it("triggers the 'change' event", function() {
        expect(changeSpy).to.have.been.called;
      });
    });
  });

});
