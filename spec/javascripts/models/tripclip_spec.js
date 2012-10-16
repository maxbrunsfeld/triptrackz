describe("models.Tripclip", function() {
  var point, model;

  beforeEach(function() {
    point = new models.Point();
    model = new models.Tripclip({ point: point });
  });

  describe("#url", function() {
    it("POSTs to the tripclips url", function() {
      expect(model.url).to.equal("/tripclips");
    });
  });

  describe("#toJSON", function() {
    var json, name, lat, lng, address;

    beforeEach(function() {
      lat = 34.0;
      lng = 35.0;
      address = "Summit Rd, Walnut Creek, CA";
      name = "Mt Diablo Fiasco";

      model.set({ name: name });
      point.location = new google.maps.LatLng(lat, lng);
      point.address = address;

      json = model.toJSON();
    });

    it("includes the tripclip's name", function() {
      expect(json.name).to.equal(name);
    });

    it("includes the region's latitude, longitude and address", function() {
      expect(json.latitude).to.equal(lat);
      expect(json.longitude).to.equal(lng);
      expect(json.address).to.equal(address);
    });
  });
});