describe("views.RoutePage", function() {
  var routePage, form, startInput, endInput, goButton, mapView;

  beforeEach(function() {
    startInput = $("<input/>").attr("name", "start");
    endInput = $("<input/>").attr("name", "end");
    goButton = $("<button/>").attr("name", "go");

    form = $("<form/>").append(startInput, endInput, goButton);

    var container = $("<div/>").append(form);

    mapView = { centerMap: sinon.spy() };

    routePage = new views.RoutePage({
      el: container,
      mapView: mapView
    }); 
  });

  describe("when the user types a start and point and clicks 'go'", function() {
    beforeEach(function() {
      startInput.val("Chicago, IL");
      endInput.val("St Louis, MO");
      goButton.click();
    });

    it("requests from google the latitude and longitude of the start point", function() {
      expect(google.backdoor.allGeocodeRequests.length).to.equal(1);
      var lastGeocodeRequest = _.last(google.backdoor.allGeocodeRequests);
      expect(lastGeocodeRequest.options.address).to.equal("Chicago, IL");
    });

    describe("when the location request completes", function() {
      var latLng;

      beforeEach(function() {
        latLng = new google.maps.LatLng(34, -120);
        google.backdoor.completeLastGeocodeRequest(latLng);
      });

      it("centers the map on the given location", function() {
        expect(mapView.centerMap).to.have.been.calledWith(latLng);
      });
    });
  });
});
