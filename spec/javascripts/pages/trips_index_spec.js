describe("pages.TripsIndex", function() {
  var page, mapEl, addressEl, listEl;

  beforeEach(function() {
    mapEl = $("<div/>");
    addressEl = $("<form/>");
    listEl = $("<ul></ul>");

    page = new pages.TripsIndex({
      mapEl: mapEl,
      addressEl: addressEl,
      listEl: listEl
    });
  });

  it("builds two point models", function() {
    expect(page.points.length).to.equal(2);
    expect(page.points[0]).to.be.an.instanceOf(models.Point);
    expect(page.points[1]).to.be.an.instanceOf(models.Point);
  });

  it("builds a region model with the points", function() {
    expect(page.region).to.be.an.instanceOf(models.Region);
    expect(page.region.points).to.eql(page.points);
  });

  it("builds a trips collection with the region", function() {
    expect(page.trips).to.be.an.instanceOf(collections.Trips);
    expect(page.trips.region).to.equal(page.region);
  });

  describe("when the region changes", function() {
    var fakeServer;

    beforeEach(function() {
      fakeServer = sinon.fakeServer.create();
      page.region.boundaries = new google.maps.LatLngBounds(
        new google.maps.LatLng(1, 2),
        new google.maps.LatLng(3, 4)
      );
      page.region.trigger("change");
    });

    it("re-fetches the trips collection", function() {
      expect(fakeServer.requests.length).to.equal(1);
      expect(fakeServer.requests[0].url).to.equal(page.trips.url());
    });

    describe("when the fetch completes", function() {
      it("adds the trips from the response to the collection", function() {
        var addSpy = sinon.spy();
        page.trips.on("add", addSpy);
        fakeServer.requests[0].respond(
          200,
          {},
          '[{"id": 1}, {"id": 2}, {"id": 3}]'
        );

        expect(addSpy).to.have.been.calledThrice;
      });
    });
  });

  it("builds a trips list view with the collection", function() {
    expect(page.tripsList).to.be.an.instanceOf(views.TripsList);
    expect(page.tripsList.collection).to.equal(page.trips);
    expect(page.tripsList.el).to.equal(listEl[0]);
  });

  it("builds a map view with the region", function() {
    expect(page.map).to.be.an.instanceOf(views.Map);
    expect(page.map.model).to.equal(page.region);
    expect(page.map.el).to.equal(mapEl[0]);
  });

  it("builds an address view with the points", function() {
    expect(page.address).to.be.an.instanceOf(views.Address);
    expect(page.address.models).to.eql(page.points);
    expect(page.address.el).to.equal(addressEl[0]);
  });

  it("builds a marker set view with the collection", function() {
    expect(page.markerSet).to.be.an.instanceOf(views.MarkerSet);
    expect(page.markerSet.collection).to.equal(page.trips);
    expect(page.markerSet.mapView).to.equal(page.map);
  });

});