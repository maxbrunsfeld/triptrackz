(function() {
  var PADDING_FRACTION = 0.1;

  models.Route = Backbone.Model.extend({

    setEndpoints: function(start, end) {
      this.start = start;
      this.end = end;
      this.trigger("change");
    },

    endpoints: function() {
      return [this.start, this.end];
    },

    midpoint: function() {
      return new google.maps.LatLng(
        (this.start.lat() + this.end.lat()) / 2,
        (this.start.lng() + this.end.lng()) / 2
      );
    },

    boundaries: function() {
      var midpoint = this.midpoint();
      var width = this.width();
      var height = this.height();

      return {
        sw: new google.maps.LatLng(
          midpoint.lat() - height / 2,
          midpoint.lng() - width / 2
        ),

        ne: new google.maps.LatLng(
          midpoint.lat() + height / 2,
          midpoint.lng() + width / 2
        )
      };
    },

    width: function() {
      var routeWidth = Math.abs(this.start.lng() - this.end.lng());
      return (1 + PADDING_FRACTION) * routeWidth;
    },

    height: function() {
      var routeWidth = Math.abs(this.start.lat() - this.end.lat());
      return (1 + PADDING_FRACTION) * routeWidth;
    }

  });
})();
