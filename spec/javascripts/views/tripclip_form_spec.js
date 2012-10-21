describe("views.TripclipForm", function() {
  var view, nameInput, fileInput, button, model;

  beforeEach(function() {
    nameInput = $("<input/>").attr("name", "name");
    fileInput = $("<input/>").attr("name", "clip");
    button = $("<button/>").attr("name", "submit");
    var form = $("<form/>").append(nameInput, fileInput, button);

    model = new models.Tripclip();
    view = new views.TripclipForm({ el: form, model: model });
  });

  describe("filling out the form and clicking the submit button", function() {
    beforeEach(function() {
      sinon.stub(model, "setFileInput");
      sinon.stub(model, "save");
      nameInput.val("Adventure in Temescal");
    });

    it("sets the file input on the model", function() {
      button.click();
      var fileInputUsed = model.setFileInput.args[0][0];
      expect(fileInputUsed[0]).to.equal(fileInput[0])
    });

    it("saves the tripclip model", function() {
      button.click();
      expect(model.save).to.have.been.calledWith({
        name: "Adventure in Temescal"
      });
    });
  });
});