describe("views.Address", function() {
  var address, form, startInput, endInput, goButton, model;

  beforeEach(function() {
    startInput = $("<input/>").attr("name", "start");
    endInput = $("<input/>").attr("name", "end");
    goButton = $("<button/>").attr("name", "go");
    form = $("<form/>").append(startInput, goButton);

    model = new models.Region();
  });

  describe("when the view is initialized with two input fields", function() {
    beforeEach(function() {
      form.append(endInput);

      address = new views.Address({
        el: $("<div/>").append(form),
        model: model
      });
    });

    describe("when the user types a start and end address and clicks 'go'", function() {
      beforeEach(function() {
        startInput.val("Chicago, IL");
        endInput.val("St Louis, MO");
        goButton.click();
      });

      it("requests from google the coordinates of the start and end addresses", function() {
        var requests = google.backdoor.allGeocodeRequests;
        var addressesRequested = _.map(requests, function(request) {
          return request.options.address;
        });

        expect(addressesRequested).to.eql([
          "Chicago, IL",
          "St Louis, MO"
        ]);
      });

      describe("when both location requests complete", function() {
        var start, end;

        beforeEach(function() {
          sinon.spy(model, "setPoints");

          start = new google.maps.LatLng(34, -120);
          end = new google.maps.LatLng(35, -122);

          var requests = google.backdoor.allGeocodeRequests;
          google.backdoor.completeGeocodeRequest(requests[0], start);
          google.backdoor.completeGeocodeRequest(requests[1], end);
        });

        it("sets the points on the region model", function() {
          expect(model.setPoints).to.have.been.calledWith([start, end]);
        });
      });
    });
  });

  describe("when the view is initialized with one input field", function() {
    beforeEach(function() {
      address = new views.Address({
        el: $("<div/>").append(form),
        model: model
      });
    });

    describe("when the user types an address and clicks 'go'", function() {
      beforeEach(function() {
        startInput.val("Chicago, IL");
        goButton.click();
      });

      it("requests from google the coordinates of the address", function() {
        var requests = google.backdoor.allGeocodeRequests;
        var addressesRequested = _.map(requests, function(request) {
          return request.options.address;
        });

        expect(addressesRequested).to.eql([ "Chicago, IL" ]);
      });

      describe("when the location request completes", function() {
        var point;

        beforeEach(function() {
          sinon.spy(model, "setPoints");

          point = new google.maps.LatLng(34, -120);

          var requests = google.backdoor.allGeocodeRequests;
          google.backdoor.completeGeocodeRequest(requests[0], point);
        });

        it("sets the point on the region model", function() {
          expect(model.setPoints).to.have.been.calledWith([point]);
        });
      });
    });
  });
});
