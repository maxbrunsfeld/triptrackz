(function() {

  presenters.triptracksList = function(triptracks) {
    return { triptracks: _.map(triptracks, presentTriptrack) };
  };

  function presentTriptrack(triptrack) {
    return {
      id: triptrack.id,
      name: triptrack.name,
      description: triptrack.description,
      clip_url: triptrack.clip_url
    };
  }

})();