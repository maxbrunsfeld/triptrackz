views.Map = Backbone.View.extend({

  initialize: function() {
    this.map = new google.maps.Map(this.el, {
      center: new google.maps.LatLng(39, -104),
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    this.marker = new google.maps.Marker({
      map: this.map,
      draggable: true,
      position: new google.maps.LatLng(39, -104)
    });

    this.model.on("change", _.bind(this.centerMap, this));
  },

  centerMap: function() {
    var bounds = new google.maps.LatLngBounds(
      this.model.southwestCorner(),
      this.model.northeastCorner()
    );
    this.map.fitBounds(bounds);
  }

});