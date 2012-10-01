describe("views.Map", function() {
  var el, view, googleMap;

  beforeEach(function() {
    el = document.createElement("div");
    view = new views.Map({ el: el });
    googleMap = _.last(google.backdoor.allMaps);
  });

  it("creates a google map with the view's element", function() {
    expect(google.backdoor.allMaps.length).to.eql(1);
    expect(googleMap).to.exist
    expect(googleMap.el).to.equal(el);
  });

  it("centers the map on the united states", function() {
    var center = googleMap.center;
    var denver = new google.maps.LatLng(39.7392, -104.9842);

    expect(center).to.be.an.instanceOf(google.maps.LatLng);
    expect(google.backdoor.distance(center, denver)).to.be.lessThan(10);
  });

  it("sets a reasonable zoom level and map type", function() {
    expect(googleMap.options.zoom).to.be.within(3, 6);
    expect(googleMap.options.mapTypeId).to.equal(google.maps.MapTypeId.ROADMAP);
  });

  describe("#centerMap(latLng)", function() {
    it("re-centers the map at the given coordinates", function() {
      var newCenter = new google.maps.LatLng(40, -130);
      view.centerMap(newCenter);
      expect(googleMap.center).to.equal(newCenter);
    });
  });
});
