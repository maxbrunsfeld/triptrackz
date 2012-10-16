views.Map = Backbone.View.extend({

  initialize: function() {
    this.map = new google.maps.Map(this.el, {
      center: new google.maps.LatLng(39, -104),
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    this.model.on("change", this.regionChanged, this);
  },

  regionChanged: function() {
    this.map.fitBounds(this.model.boundaries);
  }

});