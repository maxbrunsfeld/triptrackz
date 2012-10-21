views.Address = Backbone.View.extend({

  events: {
    "click button": "formSubmitted"
  },

  initialize: function(options) {
    this.models = options.models;
    var inputs = this.$("input");

    _.each(this.models, function(model, i) {
      model.on("change", function() {
        inputs.eq(i).val(model.address());
      });
    });
  },

  formSubmitted: function(e) {
    e.preventDefault();
    var inputs = this.$("input");
    _.each(this.models, function(model, i) {
      model.setAddress(inputs.eq(i).val());
    });
  }

});
