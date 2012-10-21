describe("models.Point", function() {
  var model, changeSpy;

  beforeEach(function() {
    model = new models.Point();
    changeSpy = sinon.spy();
    model.on("change", changeSpy);
  });

  describe("#setLocation", function() {
    var point, request;

    beforeEach(function() {
      point = new google.maps.LatLng(1, 2);
      model.setLocation([ point ]);
      request = google.backdoor.allGeocodeRequests[0];
    });

    it("geocodes the given location", function() {
      expect(request.options.location).to.eql([ point ]);
    });

    it("is pending", function() {
      expect(model.isPending()).to.be.true;
    });

    it("does not trigger the 'change' event until the geocoding finishes", function() {
      expect(changeSpy).not.to.have.been.called;
    });

    describe("when the geocode request finishes", function() {
      beforeEach(function() {
        google.backdoor.completeGeocodeRequest(request, {
          formatted_address: "Chicago, IL"
        });
      });

      it("stores the address", function() {
        expect(model.address()).to.equal("Chicago, IL");
      });

      it("triggers the 'change' event", function() {
        expect(changeSpy).to.have.been.called;
      });

      it("is no longer pending", function() {
        expect(model.isPending()).to.be.false;
      });
    });
  });

  describe("#setAddress", function() {
    var address, request;

    beforeEach(function() {
      address = "Chicago, IL";
      model.setAddress([ address ]);
      request = google.backdoor.allGeocodeRequests[0];
    });

    it("geocodes the given address", function() {
      expect(request.options.address).to.eql([ address ]);
    });

    it("does not trigger the 'change' event until the geocoding finishes", function() {
      expect(changeSpy).not.to.have.been.called;
    });

    it("is pending", function() {
      expect(model.isPending()).to.be.true;
    });

    describe("when the geocode request finishes", function() {
      var point;

      beforeEach(function() {
        point = new google.maps.LatLng(34, -120);
        google.backdoor.completeGeocodeRequest(request, {
          geometry: { location: point }
        });
      });

      it("stores the location", function() {
        expect(model.location()).to.eql(point);
      });

      it("triggers the 'change' event", function() {
        expect(changeSpy).to.have.been.called;
      });

      it("is no longer pending", function() {
        expect(model.isPending()).to.be.false;
      });
    });
  });

});
