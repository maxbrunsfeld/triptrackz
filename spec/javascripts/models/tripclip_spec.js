describe("models.Tripclip", function() {
  var point, model;

  beforeEach(function() {
    model = new models.Tripclip();
  });

  it("builds a blank point model", function() {
    expect(model.point).to.be.an.instanceOf(models.Point);
    expect(model.point.isPending()).to.be.true;
  });

  describe("when coordinates are set", function() {
    it("sets them on the point model", function() {
      model.set({
        latitude: 12,
        longitude: 34,
        address: "123 Fake St"
      });

      expect(model.point.location().lat()).to.equal(12);
      expect(model.point.location().lng()).to.equal(34);
      expect(model.point.address()).to.equal("123 Fake St");
    });
  });

  describe("#url", function() {
    it("POSTs to the tripclips url", function() {
      expect(model.url).to.equal("/tripclips");
    });
  });

  describe("#toJSON", function() {
    var json, name, lat, lng, address;

    beforeEach(function() {
      name = "Mt Diablo Fiasco";
      lat = 34.0;
      lng = 35.0;
      address = "Summit Rd, Walnut Creek, CA";

      model.set({
        name: name,
        latitude: lat,
        longitude: lng,
        address: address
      });

      json = model.toJSON();
    });

    it("includes the tripclip's name", function() {
      expect(json.name).to.equal(name);
    });

    it("includes the latitude, longitude and address", function() {
      expect(json.latitude).to.equal(lat);
      expect(json.longitude).to.equal(lng);
      expect(json.address).to.equal(address);
    });
  });
});