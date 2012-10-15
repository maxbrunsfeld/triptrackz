views.Map = Backbone.View.extend({

  initialize: function() {
    this.map = new google.maps.Map(this.el, {
      center: new google.maps.LatLng(39, -104),
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    this.model.on("change", this.centerMap, this);
  },

  centerMap: function() {
    var bounds = new google.maps.LatLngBounds(
      this.model.southwestCorner(),
      this.model.northeastCorner()
    );
    this.map.fitBounds(bounds);
  }

});