views.TripclipsList = Backbone.View.extend({
  initialize: function(options) {
    this.collection.on("reset", this.render, this);
  },

  render: function() {
    var data = {
      tripclips: this.collection.map(function(tripclip) {
        return { name: tripclip.get("name") };
      })
    };

    var html = SMT["tripclips/list"](data);
    this.$el.html(html);
  }
});