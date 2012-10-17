describe("collections.Tripclips", function() {
  var collection;

  beforeEach(function() {
    collection = new collections.Tripclips();
  });

  it("has the right url", function() {
    expect(collection.url).to.equal("/tripclips");
  });

  it("contains tripclip models", function() {
    expect(collection.model).to.equal(models.Tripclip);
  })
})
