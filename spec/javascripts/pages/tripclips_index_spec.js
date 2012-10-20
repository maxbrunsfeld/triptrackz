describe("pages.TripclipsIndex", function() {
  var page, mapEl, addressEl, listEl;

  beforeEach(function() {
    mapEl = $("<div/>");
    addressEl = $("<form/>");
    listEl = $("<ul></ul>");

    page = new pages.TripclipsIndex({
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

  it("builds a tripclips collection with the region", function() {
    expect(page.tripclips).to.be.an.instanceOf(collections.Tripclips);
    expect(page.tripclips.region).to.equal(page.region);
  });

  describe("when the region changes", function() {
    it("refetches the tripclips collection", function() {
      var fakeServer = sinon.fakeServer.create();

      page.region.boundaries = new google.maps.LatLngBounds(
        new google.maps.LatLng(1, 2),
        new google.maps.LatLng(3, 4)
      );
      page.region.trigger("change");

      expect(fakeServer.requests.length).to.equal(1);
      expect(fakeServer.requests[0].url).to.equal(page.tripclips.url());
    });
  });

  it("builds a tripclips list view with the collection", function() {
    expect(page.tripclipsList).to.be.an.instanceOf(views.TripclipsList);
    expect(page.tripclipsList.collection).to.equal(page.tripclips);
    expect(page.tripclipsList.el).to.equal(listEl[0]);
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

});