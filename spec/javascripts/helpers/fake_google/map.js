(function() {

  google.maps.Map = function(el, options) {
    this.el = el;
    this.options = options;
    this.initialize();

    google.maps.Map.all.push(this);
  };

  google.maps.Map.all = [];

  _.extend(google.maps.Map.prototype, Backbone.Events, {

    initialize: function() {
      this.$el = $(this.el);
      this.showState();
    },

    showState: function() {
      this.$el.text(JSON.stringify({
        center: this.options.center,
        directions: this.directionsData
      }));
    }

  });

})();
