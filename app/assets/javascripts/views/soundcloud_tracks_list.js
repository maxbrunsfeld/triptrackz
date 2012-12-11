views.SoundcloudTracksList = Backbone.View.extend({

  initialize: function() {
    this.collection.on("add", function(model) {
      this.$el.append('<li><span class="title">' + model.get('title') + '</span></li>');
    }, this);
  }



});