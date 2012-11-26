views.SoundcloudTrackSearch = Backbone.View.extend({
  events: {
    "click button[name='search']": "searchButtonClicked"
  },

  initialize: function(){
    SC.initialize({
      client_id: '756496d162bf7cdf15048b5b81a8f09c'
    });
  },

  searchButtonClicked: function() {
    var searchString = this.$("input[name='search']").val();
    SC.get('/tracks', { q: searchString, limit: 10 }, _.bind(this.tracksReceived, this));
  },

  tracksReceived: function(tracks) {
    var html = SMT["soundcloud_tracks/list"]({ tracks: tracks });
    this.$("ol.tracks").html(html);
  }
});