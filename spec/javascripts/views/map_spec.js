describe("views.Map", function() {
  var el, view, googleMap;

  beforeEach(function() {
    el = document.createElement("div");
    view = new views.Map({ el: el });
    googleMap = _.last(google.maps.Map.all);
  });

  it("creates a google map with the view's element", function() {
    expect(google.maps.Map.all.length).to.eql(1);
    expect(googleMap).to.exist
    expect(googleMap.el).to.equal(el);
  });

  it("centers the map on the united states", function() {
    var center = googleMap.options.center;
    var denver = new google.maps.LatLng(39.7392, -104.9842);

    expect(center).to.be.an.instanceOf(google.maps.LatLng);
    expect(center.distanceTo(denver)).to.be.lessThan(10); // degrees
  });

  it("sets a reasonable zoom level and map type", function() {
    expect(googleMap.options.zoom).to.be.within(3, 6);
    expect(googleMap.options.mapTypeId).to.equal(google.maps.MapTypeId.ROADMAP);
  });

  describe("when ", function() {
    
  });

});
