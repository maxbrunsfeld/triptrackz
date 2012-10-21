views.TripclipForm = Backbone.View.extend({
  events: {
    "click button": "formSubmitted"
  },

  formSubmitted: function(e) {
    e.preventDefault();

    this.model.save({
      name: this.$("input[name='name']").val()
    });
  }
});