(function() {

  var WAIT_TIME = 250;

  views.Map = Backbone.View.extend({

    initialize: function() {
      this.map = new google.maps.Map(this.el, {
        center: new google.maps.LatLng(39, -104),
        zoom: 4,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      this.model.on("change", this.regionChanged, this);

      google.maps.event.addListener(
        this.map,
        "bounds_changed",
        _.bind(_.debounce(this.mapMoved, WAIT_TIME), this)
      );
    },

    regionChanged: function() {
      if (this.map.getBounds().equals(this.model.boundaries)) return;
      this.map.fitBounds(this.model.boundaries);
      this.mapMoved();
    },

    mapMoved: function() {
      this.model.boundaries = this.map.getBounds();
      this.model.trigger("change");
    }

  });

})();
