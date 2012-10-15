google.maps.event = {

  addListener: function(object, eventName, callback) {
    object.on(eventName, callback);
  },

  trigger: function(object, eventName, event) {
    object.trigger(eventName, event);
  }

};