describe("pages.TripsNew", function() {
  var page, mapEl, tripFormEl, addressEl, modalEl, tracksListEl;

  beforeEach(function() {
    modalEl = $("<div/>");
    mapEl = $("<div/>");
    addressEl = $("<form/>");
    tripFormEl = $("<form/>");
    tracksListEl = $("<ol/>");
    page = new pages.TripsNew({
      mapEl: mapEl,
      addressEl: addressEl,
      tripFormEl: tripFormEl,
      modalEl: modalEl,
      tracksListEl: tracksListEl
    });
  });

  it("builds a trip model", function() {
    expect(page.trip).to.be.an.instanceOf(models.Trip);
    expect(page.point).to.equal(page.trip.point);
  });

  it("builds a region model with the trip's point", function() {
    expect(page.region).to.be.an.instanceOf(models.Region);
    expect(page.region.points).to.eql([page.point]);
  });

  it("builds a map view with the region", function() {
    expect(page.map).to.be.an.instanceOf(views.Map);
    expect(page.map.model).to.equal(page.region);
    expect(page.map.el).to.equal(mapEl[0]);
  });

  it("builds a marker view with the trip's point", function() {
    expect(page.marker).to.be.an.instanceOf(views.Marker);
    expect(page.marker.model).to.equal(page.point);
    expect(page.marker.mapView).to.equal(page.map);
  });

  it("builds an address view with the trip's point", function() {
    expect(page.address).to.be.an.instanceOf(views.Address);
    expect(page.address.models).to.eql([page.point]);
    expect(page.address.el).to.equal(addressEl[0]);
  });

  it("builds a trip form view with the trip", function() {
    expect(page.form).to.be.an.instanceOf(views.TripForm);
    expect(page.form.model).to.eql(page.trip);
    expect(page.form.el).to.equal(tripFormEl[0]);
  });

  it("builds a soundcloud track search view with the trip", function() {
    expect(page.soundcloudTrackSearch).to.be.an.instanceOf(views.SoundcloudTrackSearch);
    expect(page.soundcloudTrackSearch.el).to.equal(modalEl[0]);
    expect(page.soundcloudTrackSearch.trip).to.equal(page.trip);
  });

  it("builds a soundcloud track list view with the soundcloud tracks collection", function() {
    expect(page.soundcloudTracksList).to.be.an.instanceOf(views.SoundcloudTracksList);
    expect(page.soundcloudTracksList.collection).to.equal(page.trip.soundcloudTracks);
    expect(page.soundcloudTracksList.el).to.equal(tracksListEl[0]);
  });
});