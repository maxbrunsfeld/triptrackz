describe("pages.TriptracksNew", function() {
  var page, mapEl, triptrackFormEl, addressEl, modalEl, tracksListEl;

  beforeEach(function() {
    modalEl = $("<div/>");
    mapEl = $("<div/>");
    addressEl = $("<form/>");
    triptrackFormEl = $("<form/>");
    tracksListEl = $("<ol/>");
    page = new pages.TriptracksNew({
      mapEl: mapEl,
      addressEl: addressEl,
      triptrackFormEl: triptrackFormEl,
      modalEl: modalEl,
      tracksListEl: tracksListEl
    });
  });

  it("builds a triptrack model", function() {
    expect(page.triptrack).to.be.an.instanceOf(models.Triptrack);
    expect(page.point).to.equal(page.triptrack.point);
  });

  it("builds a region model with the triptrack's point", function() {
    expect(page.region).to.be.an.instanceOf(models.Region);
    expect(page.region.points).to.eql([page.point]);
  });

  it("builds a map view with the region", function() {
    expect(page.map).to.be.an.instanceOf(views.Map);
    expect(page.map.model).to.equal(page.region);
    expect(page.map.el).to.equal(mapEl[0]);
  });

  it("builds a marker view with the triptrack's point", function() {
    expect(page.marker).to.be.an.instanceOf(views.Marker);
    expect(page.marker.model).to.equal(page.point);
    expect(page.marker.mapView).to.equal(page.map);
  });

  it("builds an address view with the triptrack's point", function() {
    expect(page.address).to.be.an.instanceOf(views.Address);
    expect(page.address.models).to.eql([page.point]);
    expect(page.address.el).to.equal(addressEl[0]);
  });

  it("builds a triptrack form view with the triptrack", function() {
    expect(page.form).to.be.an.instanceOf(views.TriptrackForm);
    expect(page.form.model).to.eql(page.triptrack);
    expect(page.form.el).to.equal(triptrackFormEl[0]);
  });

  it("builds a soundcloud track search view with the triptrack", function() {
    expect(page.soundcloudTrackSearch).to.be.an.instanceOf(views.SoundcloudTrackSearch);
    expect(page.soundcloudTrackSearch.el).to.equal(modalEl[0]);
    expect(page.soundcloudTrackSearch.triptrack).to.equal(page.triptrack);
  });

  it("builds a soundcloud track list view with the soundcloud tracks collection", function() {
    expect(page.soundcloudTracksList).to.be.an.instanceOf(views.SoundcloudTracksList);
    expect(page.soundcloudTracksList.collection).to.equal(page.triptrack.soundcloudTracks);
    expect(page.soundcloudTracksList.el).to.equal(tracksListEl[0]);
  });
});