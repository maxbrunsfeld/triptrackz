describe("views.TriptracksList", function() {
  var view, collection, list;

  beforeEach(function() {
    collection = new collections.Triptracks();
    list = $("<ul></ul>");
    view = new views.TriptracksList({
      collection: collection,
      el: list
    });
  });

  describe("when the collection is fetched", function() {
    var items, links;

    beforeEach(function() {
      collection.add([
        {
          name: "zebra",
          description: "a stripey horse",
          latitude: 12,
          longitude: 13,
          id: 154
        },
        {
          name: "chacha",
          description: "the dance",
          latitude: 34,
          longitude: 13,
          id: 45
        }
      ]);
      items = list.find("li");
      links = list.find("li a");
    });

    it("renders a list item with an item for each triptrack", function() {
      expect(items.length).to.equal(2);
    });

    it("renders each triptrack's name as a link", function() {
      expect(links.eq(0).text()).to.contain("zebra")
      expect(links.eq(1).text()).to.contain("chacha")
    });

    it("renders each triptrack's description", function() {
      var descriptions = items.find("p.description");
      expect(descriptions.eq(0).text()).to.contain(collection.at(0).get("description"));
      expect(descriptions.eq(1).text()).to.contain(collection.at(1).get("description"));
    });

    describe("when an item is clicked", function() {
      it("selects the corresponding model", function() {
        sinon.spy(collection, "selectModel");
        links.eq(1).trigger("click");
        var model = collection.at(1);
        expect(collection.selectModel).to.have.been.calledWith(model);
      });
    });

    describe("when a triptrack is selected", function() {
      it("expands the corresponding list item", function() {
        expect(items.eq(0).hasClass("selected")).to.be.false;
        expect(items.eq(1).hasClass("selected")).to.be.false;

        collection.selectModel(collection.at(1));

        expect(items.eq(0).hasClass("selected")).to.be.false;
        expect(items.eq(1).hasClass("selected")).to.be.true;

        collection.selectModel(collection.at(0));

        expect(items.eq(0).hasClass("selected")).to.be.true;
        expect(items.eq(1).hasClass("selected")).to.be.false;
      });
    });
  });
});