describe("views.Map", function() {
  var el, view, model, googleMap;

  beforeEach(function() {
    el = document.createElement("div");
    model = new models.Region();
    view = new views.Map({ el: el, model: model });
    googleMap = _.last(google.backdoor.allMaps);
  });

  describe("#initialize", function() {
    it("creates a google map with the view's element", function() {
      expect(google.backdoor.allMaps.length).to.eql(1);
      expect(googleMap).to.exist
      expect(googleMap.el).to.equal(el);
    });

    it("centers the map on the united states", function() {
      var denverLat = 39.74;
      var denverLng = -104.9842;

      var center = googleMap.options.center;
      expect(center).to.be.an.instanceOf(google.maps.LatLng);
      expect(center.lat()).to.be.closeTo(denverLat, 1);
      expect(center.lng()).to.be.closeTo(denverLng, 1);
    });

    it("sets a reasonable zoom level and map type", function() {
      expect(googleMap.options.zoom).to.be.within(3, 6);
      expect(googleMap.options.mapTypeId).to.equal(google.maps.MapTypeId.ROADMAP);
    });
  });

  describe("when the model changes its boundaries", function() {
    it("re-centers the map at the given coordinates", function() {
      var sw = new google.maps.LatLng(38, -104);
      var ne = new google.maps.LatLng(39, -103);

      model.setPoints([sw, ne]);
      model.trigger("change");

      var bounds = new google.maps.LatLngBounds(sw, ne);
      expect(googleMap.fitBounds).to.have.been.calledWith(bounds);
    });
  });

});
