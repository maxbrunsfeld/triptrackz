views.TripclipsList = Backbone.View.extend({
  events: {
    "click a": "itemClicked"
  },

  initialize: function() {
    this.collection.on("add", this.render, this);
  },

  render: function() {
    var data = presenters.present("tripclipsList", this.collection);
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