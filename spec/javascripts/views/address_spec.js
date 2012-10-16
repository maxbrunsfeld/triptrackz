describe("views.Address", function() {
  var view, point1, form, input1, button;

  beforeEach(function() {
    input1 = $("<input/>");
    button = $("<button/>").attr("name", "go");
    form = $("<form/>").append(input1, button);

    point1 = new models.Point();
  });

  describe("when the view is initialized with two input fields", function() {
    var point2, input2;

    beforeEach(function() {
      point2 = new models.Point();
      input2 = $("<input/>");
      form.append(input2);
      sinon.spy(point1, "setAddress");
      sinon.spy(point2, "setAddress");

      view = new views.Address({ el: form, models: [point1, point2] });
    });

    describe("when the user types a start and end address and clicks 'go'", function() {
      var address1, address2;

      beforeEach(function() {
        address1 = "Chicago, IL";
        address2 = "St Louis, MO";

        input1.val(address1);
        input2.val(address2);
        button.click();
      });

      it("sets the addresses on the point models", function() {
        expect(point1.setAddress).to.have.been.calledWith(address1);
        expect(point2.setAddress).to.have.been.calledWith(address2);
      });
    });
  });

  describe("when the view is initialized with one input field", function() {
    var address;

    beforeEach(function() {
      sinon.spy(point1, "setAddress");
      view = new views.Address({ el: form, models: [point1] });
    });

    describe("when the user types an address and clicks 'go'", function() {

      beforeEach(function() {
        address = "Chicago, IL";
        input1.val(address);
        button.click();
      });

      it("sets the address on the region model", function() {
        expect(point1.setAddress).to.have.been.calledWith(address);
      });
    });

    describe("when the model changes", function() {
      var address;

      beforeEach(function() {
        address = "San Francisco, CA";
        point1.setAddress([ address ]);
        point1.trigger("change");
      });

      it("displays the new address in the input field", function() {
        expect(input1.val()).to.equal(address);
      });
    });
  });
});
