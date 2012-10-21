describe("pages.TripclipsNew", function() {
  var page, mapEl, tripclipFormEl, addressEl;

  beforeEach(function() {
    mapEl = $("<div/>");
    addressEl = $("<form/>");
    tripclipFormEl = $("<form/>");
    page = new pages.TripclipsNew({
      mapEl: mapEl,
      addressEl: addressEl,
      tripclipFormEl: tripclipFormEl
    });
  });

  it("builds a tripclip model", function() {
    expect(page.tripclip).to.be.an.instanceOf(models.Tripclip);
    expect(page.point).to.equal(page.tripclip.point);
  });

  it("builds a region model with the tripclip's point", function() {
    expect(page.region).to.be.an.instanceOf(models.Region);
    expect(page.region.points).to.eql([page.point]);
  });

  it("builds a map view with the region", function() {
    expect(page.map).to.be.an.instanceOf(views.Map);
    expect(page.map.model).to.equal(page.region);
    expect(page.map.el).to.equal(mapEl[0]);
  });

  it("builds a marker view with the tripclip's point", function() {
    expect(page.marker).to.be.an.instanceOf(views.Marker);
    expect(page.marker.model).to.equal(page.point);
    expect(page.marker.mapView).to.equal(page.map);
  });

  it("builds an address view with the tripclip's point", function() {
    expect(page.address).to.be.an.instanceOf(views.Address);
    expect(page.address.models).to.eql([page.point]);
    expect(page.address.el).to.equal(addressEl[0]);
  });

  it("builds a tripclip form view with the tripclip", function() {
    expect(page.form).to.be.an.instanceOf(views.TripclipForm);
    expect(page.form.model).to.eql(page.tripclip);
    expect(page.form.el).to.equal(tripclipFormEl[0]);
  });
});