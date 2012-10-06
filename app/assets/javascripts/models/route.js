models.Route = Backbone.Model.extend({

  setEndpoints: function(start, end) {
    this.start = start;
    this.end = end;
    this.trigger("change");
  },

  southwestCorner: function() {
    return new google.maps.LatLng(
      Math.min(this.start.lat(), this.end.lat()),
      Math.min(this.start.lng(), this.end.lng())
    );
  },

  northeastCorner: function() {
    return new google.maps.LatLng(
      Math.max(this.start.lat(), this.end.lat()),
      Math.max(this.start.lng(), this.end.lng())
    );
  }
});
