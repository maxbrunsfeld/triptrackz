(function() {

  presenters.tripclipsList = function(tripclips) {
    return { tripclips: _.map(tripclips, presentTripclip) };
  };

  function presentTripclip(tripclip) {
    return {
      id: tripclip.id,
      name: tripclip.name,
      description: tripclip.description,
      clip_url: tripclip.clip_url
    };
  }

})();