(function() {

  var PADDING = 0.025;

  models.Region = Backbone.Model.extend({
    initialize: function(options) {
      this.points = options && options.points;
      _.each(this.points, function(point) {
        point.on("change", this.pointChanged, this);
      }, this);
    },

    pointChanged: function() {
      if (!this.pointsArePending()) {
        this.adjustBoundaries();
      }
    },

    pointsArePending: function() {
      return _.any(this.points, function(point) {
        return point.isPending();
      });
    },

    anyPointIsOutsideBoundaries: function() {
      if (!this.boundaries) return true;
      return _.any(this.points, function(point) {
        return !this.boundaries.contains(point.location());
      }, this);
    },

    adjustBoundaries: function() {
      var padding = (this.points.length === 1) ? PADDING : 0;
      this.boundaries = new google.maps.LatLngBounds(
        new google.maps.LatLng(
          this.south() - padding,
          this.west() - padding
        ),
        new google.maps.LatLng(
          this.north() + padding,
          this.east() + padding
        )
      );
      this.trigger("change");
    },

    north: function() {
      return _.max(this.latitudes());
    },

    south: function() {
      return _.min(this.latitudes());
    },

    east: function() {
      return _.max(this.longitudes());
    },

    west: function() {
      return _.min(this.longitudes());
    },

    latitudes: function() {
      return _.map(this.points, function(point) {
        return point.location().lat();
      });
    },

    longitudes: function() {
      return _.map(this.points, function(point) {
        return point.location().lng();
      });
    }
  });

})();
