describe("models.Trip", function() {
  var point, model;

  beforeEach(function() {
    model = new models.Trip();
  });

  it("builds a blank point model", function() {
    expect(model.point).to.be.an.instanceOf(models.Point);
    expect(model.point.isPending()).to.be.true;
  });

  it("has a collection of soundcloud tracks", function() {
    expect(model.tracks).to.be.an.instanceOf(collections.Tracks)
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
    it("POSTs to the trips url", function() {
      expect(model.url).to.equal("/trips");
    });
  });

  describe("#toJSON", function() {
    var json, name, lat, lng, address, description;

    beforeEach(function() {
      name = "Mt Diablo Fiasco";
      lat = 34.0;
      lng = 35.0;
      address = "Summit Rd, Walnut Creek, CA";
      description = " max is an asshole";

      model.set({
        name: name,
        latitude: lat,
        longitude: lng,
        address: address,
        description: description
      });

      json = model.toJSON();
    });

    it("includes the trip's name", function() {
      expect(json.name).to.equal(name);
    });

    it("includes the latitude, longitude, address, and description", function() {
      expect(json.latitude).to.equal(lat);
      expect(json.longitude).to.equal(lng);
      expect(json.address).to.equal(address);
      expect(json.description).to.equal(description);
    });
  });

  describe("#save", function() {
    var fileInput, ajaxOptions;

    beforeEach(function() {
      sinon.stub($, "ajax");

      fileInput = $("<input type='file'/>");
      var form = $("<form></form>").append(fileInput);
      model.setFileInput(fileInput);

      model.save({
        name: "late night sushi",
        latitude: 1,
        longitude: 2
      });

      ajaxOptions = $.ajax.args[0][0];
    });

    afterEach(function() {
      $.ajax.restore();
    });

    it("uses the jquery iframe transport", function() {
      expect($.ajax).to.have.been.calledOnce;
      expect(ajaxOptions.iframe).to.be.true;
    });

    it("includes the model's file inputs", function() {
      expect(ajaxOptions.files).to.be.equal(fileInput);
    });

    it("passes the model's other data", function() {
      var data = ajaxOptions.data;
      expect(data.name).to.equal("late night sushi");
      expect(data.latitude).to.equal(1);
      expect(data.longitude).to.equal(2);
    });

    it("passes the csrf token", function() {
      var data = ajaxOptions.data;
      expect(data[csrf_param]).to.equal(csrf_token);
    });
  });
});