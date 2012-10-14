models.Region = Backbone.Model.extend({
  PADDING: 0.025,

  setPoints: function(points) {
    this.points = points;
    this.trigger("change");
  },

  southwestCorner: function() {
    if (this.points.length > 1) {
      return new google.maps.LatLng(
        _.min(this.latitudes()),
        _.min(this.longitudes())
      );
    } else {
      return new google.maps.LatLng(
        this.points[0].lat() - this.PADDING,
        this.points[0].lng() - this.PADDING
      );
    }
  },

  northeastCorner: function() {
    if (this.points.length > 1) {
      return new google.maps.LatLng(
        _.max(this.latitudes()),
        _.max(this.longitudes())
      );
    } else {
      return new google.maps.LatLng(
        this.points[0].lat() + this.PADDING,
        this.points[0].lng() + this.PADDING
      );
    }
  },

  latitudes: function() {
    return _.map(this.points, function(point) { return point.lat(); });
  },

  longitudes: function(){
    return _.map(this.points, function(point) { return point.lng(); });
  }

});
