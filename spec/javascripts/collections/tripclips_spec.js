describe("collections.Tripclips", function() {
  var collection, region;

  beforeEach(function() {
    region = new models.Region({ points: [] });
    collection = new collections.Tripclips([], { region: region });
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

  describe("#selectModel", function() {
    var model;

    beforeEach(function() {
      collection.reset([
        {name: "dog"},
        {name: "cat"},
        {name: "goat"}
      ]);
      model = collection.at(1);
    });

    it("sets the model as selected", function() {
      collection.selectModel(model);
      expect(collection.selectedModel).to.equal(model);
    });

    it("triggers the select event", function() {
      var selectSpy = sinon.spy();
      collection.on("select", selectSpy);
      collection.selectModel(model);
      expect(selectSpy).to.have.been.calledWith(model);
    });
  });
});

