(function() {

  presenters.tripsList = function(trips) {
    return { trips: _.map(trips, presentTrip) };
  };

  function presentTrip(trip) {
    return {
      id: trip.id,
      name: trip.name,
      description: trip.description,
      clip_url: trip.clip_url
    };
  }

})();