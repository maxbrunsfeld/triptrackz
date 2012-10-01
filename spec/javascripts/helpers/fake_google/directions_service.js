(function() {

  google.maps.DirectionsService = $.noop;

  _.extend(google.maps.DirectionsService.prototype, {

    route: function(options, callback) {
      $.ajax("/specs/directions", {
        data: {
          origin: options.origin,
          destination: options.destination
        },

        success: callback
      });
    }

  });

})();
