views.TripclipsList = Backbone.View.extend({
  events: {
    "click a": "itemClicked"
  },

  initialize: function(options) {
    this.collection.on("reset", this.render, this);
  },

  render: function() {
    var data = {
      tripclips: this.collection.map(function(tripclip) {
        return {
          name: tripclip.get("name"),
          id: tripclip.get("id")
        };
      })
    };

    var html = SMT["tripclips/list"](data);
    this.$el.html(html);
  },

  itemClicked: function(e) {
    e.preventDefault();
    var link = $(e.target);
    var id = link.data("id");
    this.collection.selectModel(this.collection.get(id));
  }
});