models.Region = Backbone.Model.extend({

  setPoints: function(points) {
    this.points = points;
    this.trigger("change");
  },

  southwestCorner: function() {
    return new google.maps.LatLng(
      _.min(this.latitudes()),
      _.min(this.longitudes())
    );
  },

  northeastCorner: function() {
    return new google.maps.LatLng(
      _.max(this.latitudes()),
      _.max(this.longitudes())
    );
  },

  latitudes: function() {
    return _.map(this.points, function(point) { return point.lat(); });
  },

  longitudes: function(){
    return _.map(this.points, function(point) { return point.lng(); });
  }
});
