describe("views.RoutePage", function() {
  var routePage, form, startInput, endInput, goButton, model;

  beforeEach(function() {
    startInput = $("<input/>").attr("name", "start");
    endInput = $("<input/>").attr("name", "end");
    goButton = $("<button/>").attr("name", "go");

    form = $("<form/>").append(startInput, endInput, goButton);

    model = new models.Route();

    routePage = new views.RoutePage({
      el: $("<div/>").append(form),
      model: model
    }); 
  });

  describe("when the user types a start and end point and clicks 'go'", function() {
    beforeEach(function() {
      startInput.val("Chicago, IL");
      endInput.val("St Louis, MO");
      goButton.click();
    });

    it("requests from google the coordinates of the start and end points", function() {
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
        sinon.spy(model, "setEndpoints");

        start = new google.maps.LatLng(34, -120);
        end = new google.maps.LatLng(35, -122);

        var requests = google.backdoor.allGeocodeRequests;
        google.backdoor.completeGeocodeRequest(requests[0], start);
        google.backdoor.completeGeocodeRequest(requests[1], end);
      });

      it("sets the endpoints on the route model", function() {
        expect(model.setEndpoints).to.have.been.calledWith(start, end);
      });
    });
  });
});
