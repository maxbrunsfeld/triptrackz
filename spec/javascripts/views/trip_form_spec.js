describe("views.TripForm", function() {
  var view, nameInput, fileInput, button, model, descriptionInput;

  beforeEach(function() {
    nameInput = $("<input/>").attr("name", "name");
    fileInput = $("<input/>").attr("name", "clip");
    button = $("<button/>").attr("name", "submit");
    descriptionInput = $("<textarea/>").attr("name", "description");
    var form = $("<form/>").append(
      nameInput,
      fileInput,
      descriptionInput,
      button
    );

    model = new models.Trip();
    view = new views.TripForm({ el: form, model: model });
  });

  describe("filling out the form and clicking the submit button", function() {
    beforeEach(function() {
      sinon.stub(model, "setFileInput");
      sinon.stub(model, "save");
      nameInput.val("Adventure in Temescal");
      descriptionInput.val("This is a really great tour of Temescal.")
    });

    it("sets the file input on the model", function() {
      button.click();
      var fileInputUsed = model.setFileInput.args[0][0];
      expect(fileInputUsed[0]).to.equal(fileInput[0])
    });

    it("saves the trip model", function() {
      button.click();
      expect(model.save).to.have.been.calledWith({
        name: "Adventure in Temescal",
        description: "This is a really great tour of Temescal."
      });
    });
  });
});