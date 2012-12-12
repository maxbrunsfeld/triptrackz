describe("views.TracksList", function() {
  var view, list, collection;

  beforeEach(function() {
    list = $("<ol></ol>");
    collection = new collections.Tracks()
    view = new views.TracksList({
      el: list,
      collection: collection
    });
  });

  describe("when a model is added to the collection", function() {
    var track;

    beforeEach(function() {
      track = new models.Track({
        id: 6,
        title: "partyon"
      });
    });

    it("adds a list item to the tracks list", function() {
      expect(list.find("li").length).to.equal(0);
      collection.add(track);
      expect(list.find("li").length).to.equal(1);
    });

    it("includes the title of the model in the list item", function() {
      collection.add(track);
      var listItem = $(list.find("li")[0]);
      expect(listItem.find("span.title").text()).to.equal("partyon");
    });
  });
});

