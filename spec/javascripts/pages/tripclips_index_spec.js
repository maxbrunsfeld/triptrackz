describe("pages.TripclipsIndex", function() {
  var page, mapEl, addressEl;

  beforeEach(function() {
    mapEl = $("<div/>");
    addressEl = $("<form/>");
    page = new pages.TripclipsIndex({
      mapEl: mapEl,
      addressEl: addressEl
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