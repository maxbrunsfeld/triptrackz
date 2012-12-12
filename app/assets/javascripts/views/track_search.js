views.TrackSearch = Backbone.View.extend({
  events: {
    "click button[name='search']": "searchButtonClicked",
    "click a.track" : "trackLinkClicked",
    "click button[name='add-track']": "addTrackButtonClicked"
  },

  initialize: function(options) {
    this.trip = options.trip;
    this.tracks = new collections.Tracks();
    SC.initialize({
      client_id: '756496d162bf7cdf15048b5b81a8f09c'
    });
  },

  searchButtonClicked: function() {
    var searchString = this.$("input[name='search']").val();
    SC.get('/tracks', { q: searchString, limit: 10 }, _.bind(this.tracksReceived, this));
  },

  tracksReceived: function(tracks) {
    this.tracks.reset(tracks);
    var html = SMT["tracks/list"]({ tracks: tracks });
    this.$("ol.tracks").html(html);
  },
  
  trackLinkClicked: function(e) {
    var clickedLink = $(e.target);
    this.selectedTrackId = clickedLink.data("id");
    this.$("li a").removeClass("selected");
    clickedLink.addClass("selected");
    this.$("button[name='add-track']").attr("disabled", null);
  },

  addTrackButtonClicked: function() {
    var selectedTrack = this.tracks.get(this.selectedTrackId);
    this.trip.tracks.add(selectedTrack);
  }
});