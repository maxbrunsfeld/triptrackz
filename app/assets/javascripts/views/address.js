views.Address = Backbone.View.extend({

  events: {
    "click button[name='go']": "formSubmitted"
  },

  initialize: function() {
    this.model.on("change", this.addressChanged, this);
  },

  formSubmitted: function(e) {
    e.preventDefault();
    var inputs = this.$("input");
    var addresses = _.map(inputs, function(input) {
      return $(input).val();
    });
    this.model.setAddresses(addresses);
  },

  addressChanged: function() {
    var inputs = this.$("input");
    _.each(this.model.addresses, function(address, i) {
      inputs.eq(i).val(address);
    });
  }

});
