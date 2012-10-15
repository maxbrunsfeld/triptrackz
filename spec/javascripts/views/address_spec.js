describe("views.Address", function() {
  var address, form, startInput, endInput, goButton, model;

  beforeEach(function() {
    startInput = $("<input/>");
    endInput = $("<input/>");
    goButton = $("<button/>").attr("name", "go");
    form = $("<form/>").append(startInput, goButton);

    model = new models.Region();
    sinon.spy(model, "setAddresses");
  });

  describe("when the view is initialized with two input fields", function() {
    beforeEach(function() {
      form.append(endInput);

      address = new views.Address({
        el: $("<div/>").append(form),
        model: model
      });
    });

    describe("when the user types a start and end address and clicks 'go'", function() {
      var address1, address2;

      beforeEach(function() {
        address1 = "Chicago, IL";
        address2 = "St Louis, MO";

        startInput.val(address1);
        endInput.val(address2);
        goButton.click();
      });

      it("sets the addresses on the region model", function() {
        expect(model.setAddresses).to.have.been.calledWith([address1, address2]);
      });
    });
  });

  describe("when the view is initialized with one input field", function() {
    beforeEach(function() {
      address = new views.Address({
        el: $("<div/>").append(form),
        model: model
      });
    });

    describe("when the user types an address and clicks 'go'", function() {
      var address1;

      beforeEach(function() {
        address1 = "Chicago, IL";

        startInput.val(address1);
        goButton.click();
      });

      it("sets the address on the region model", function() {
        expect(model.setAddresses).to.have.been.calledWith([ address1 ]);
      });
    });

    describe("when the model changes", function() {
      var address;

      beforeEach(function() {
        address = "San Francisco, CA";
        model.setAddresses([ address ]);
        model.trigger("change");
      });

      it("displays the new address in the input field", function() {
        expect(startInput.val()).to.equal(address);
      });
    });
  });
});
