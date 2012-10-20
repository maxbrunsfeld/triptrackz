describe("collections.Tripclips", function() {
  var collection, region;

  beforeEach(function() {
    region = new models.Region({ points: [] });
    collection = new collections.Tripclips({ region: region });
  });

  it("contains tripclip models", function() {
    expect(collection.model).to.equal(models.Tripclip);
  });

  describe("#url", function(){
    it("includes parameters for the region's boundaries", function() {
      region.boundaries = new google.maps.LatLngBounds(
        new google.maps.LatLng(34, -111),
        new google.maps.LatLng(35, -109)
      );
      expect(collection.url()).to.equal(
        "/tripclips?north=35&south=34&east=-109&west=-111"
      );
    });
  });
});