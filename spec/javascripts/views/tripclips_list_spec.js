describe("views.TripclipsList", function() {
  var view, collection, list;

  beforeEach(function() {
    collection = new collections.Tripclips();
    list = $("<ul></ul>");
    view = new views.TripclipsList({
      collection: collection,
      el: list
    });
  });

  describe("when the collection is fetched", function() {
    var links;

    beforeEach(function() {
      collection.reset([
        {
          name: "zebra",
          latitude: 12,
          longitude: 13,
          id: 154
        },
        {
          name: "chacha",
          latitude: 34,
          longitude: 13,
          id: 45
        }
      ]);
      links = list.find("li a");
    });

    it("renders a list item with a link for each tripclip", function() {
      expect(links.length).to.equal(2);
      expect(links.eq(0).text()).to.contain("zebra")
      expect(links.eq(1).text()).to.contain("chacha")
    });

    describe("when an item is clicked", function() {
      it("selects the corresponding model", function() {
        sinon.spy(collection, "selectModel");
        links.eq(1).trigger("click");
        var model = collection.at(1);
        expect(collection.selectModel).to.have.been.calledWith(model);
      });
    });
  });
});