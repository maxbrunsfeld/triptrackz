describe("views.TripclipForm", function() {
  var form, view, nameInput, submitButton, model;

  beforeEach(function() {
    nameInput = $("<input/>").attr("name", "name");
    submitButton = $("<button/>").attr("name", "submit");
    form = $("<form/>").append(nameInput, submitButton);

    model = new models.Tripclip();
    view = new views.TripclipForm({ el: form, model: model });
  });

  describe("filling out the form and clicking the submit button", function() {
    beforeEach(function() {
      nameInput.val("Adventure in Temescal");
    });

    it("saves the tripclip model", function() {
      sinon.stub(model, "save");

      submitButton.click();
      expect(model.save).to.have.been.calledWith({
        name: "Adventure in Temescal"
      });
    });
  });
});