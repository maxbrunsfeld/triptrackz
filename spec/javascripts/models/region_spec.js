describe("models.Region", function() {
  var model;

  beforeEach(function() {
    model = new models.Region();
  });

  describe("#setPoints", function() {
    var changeSpy, point1, point2;

    beforeEach(function() {
      changeSpy = sinon.spy();
      model.on("change", changeSpy);

      point1 = new google.maps.LatLng(1, 2);
      point2 = new google.maps.LatLng(4, 0);
      model.setPoints([ point1, point2 ]);
    });

    it("geocodes the given points", function() {
      var requests = google.backdoor.allGeocodeRequests;
      var locationsRequested = _.map(requests, function(request) {
        return request.options.location;
      });

      expect(locationsRequested).to.eql([ point1, point2 ]);
    });

    it("does not trigger the 'change' event until the geocoding finishes", function() {
      expect(changeSpy).not.to.have.been.called;
    });

    describe("when all of the geocode requests finish", function() {
      var address1, address2;

      beforeEach(function() {
        address1 = "Chicago, IL";
        address2 = "St Louis, MO";

        var requests = google.backdoor.allGeocodeRequests;
        google.backdoor.completeGeocodeRequest(requests[0], {
          formatted_address: address1
        });
        google.backdoor.completeGeocodeRequest(requests[1], {
          formatted_address: address2
        });
      });

      it("stores the addresses", function() {
        expect(model.addresses).to.eql([ address1, address2 ]);
      });

      it("triggers the 'change' event", function() {
        expect(changeSpy).to.have.been.called;
      });
    });
  });

  describe("#setAddresses", function() {
    var changeSpy, address1, address2;

    beforeEach(function() {
      changeSpy = sinon.spy();
      model.on("change", changeSpy);

      address1 = "Chicago, IL";
      address2 = "St Louis, MO";
      model.setAddresses([ address1, address2 ]);
    });

    it("geocodes the given addresses", function() {
      var requests = google.backdoor.allGeocodeRequests;
      var addressesRequested = _.map(requests, function(request) {
        return request.options.address;
      });

      expect(addressesRequested).to.eql([ address1, address2 ]);
    });

    it("does not trigger the 'change' event until the geocoding finishes", function() {
      expect(changeSpy).not.to.have.been.called;
    });

    describe("when all of the geocode requests finish", function() {
      var point1, point2;

      beforeEach(function() {
        point1 = new google.maps.LatLng(34, -120);
        point2 = new google.maps.LatLng(35, -122);

        var requests = google.backdoor.allGeocodeRequests;
        google.backdoor.completeGeocodeRequest(requests[0], {
          geometry: { location: point1 }
        });
        google.backdoor.completeGeocodeRequest(requests[1], {
          geometry: { location: point2 }
        });
      });

      it("stores the locations", function() {
        expect(model.points).to.eql([ point1, point2 ]);
      });

      it("triggers the 'change' event", function() {
        expect(changeSpy).to.have.been.called;
      });
    });
  });

  describe("#boundaries", function() {
    describe("when multiple points have been set", function() {
      beforeEach(function() {
        var start = new google.maps.LatLng(1, 2);
        var end = new google.maps.LatLng(4, 0);
        model.setPoints([start, end]);
      });

      it("returns the boundaries of the region", function() {
        expect(model.boundaries()).to.eql(
          new google.maps.LatLngBounds(
            new google.maps.LatLng(1, 0),
            new google.maps.LatLng(4, 2)
          )
        );
      });
    });

    describe("when only one point has been set", function() {
      beforeEach(function() {
        var point = new google.maps.LatLng(1, 2);
        model.setPoints([point]);
      });

      it("leaves some padding around the point", function (){
        expect(model.boundaries()).to.eql(
          new google.maps.LatLngBounds(
            new google.maps.LatLng(0.975, 1.975),
            new google.maps.LatLng(1.025, 2.025)
          )
        );
      });
    });
  });

});
