views.TriptrackForm = Backbone.View.extend({
  events: {
    "click button": "formSubmitted"
  },

  formSubmitted: function(e) {
    e.preventDefault();

    this.model.setFileInput(this.$("input[name='clip']"));
    this.model.save({
      name: this.$("input[name='name']").val(),
      description: this.$("textarea[name='description']").val()
    });
  }
});