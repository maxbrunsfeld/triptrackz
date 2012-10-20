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
    it("renders a list item for each tripclip", function() {
      collection.reset([
        {
          name: "zebra",
          latitude: 12,
          longitude: 13
        },
        {
          name: "chacha",
          latitude: 34,
          longitude: 13
        }
      ]);

      var items = list.find("li");
      expect(items.length).to.equal(2);
      expect(items.eq(0).text()).to.contain("zebra")
      expect(items.eq(1).text()).to.contain("chacha")
    });
  });
});