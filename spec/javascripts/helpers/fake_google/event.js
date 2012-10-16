//= require ./map
//= require ./marker

google.maps.event = {

  addListener: function(object, eventName, callback) {
    object.on(eventName, callback);
  },

  trigger: function(object, eventName, event) {
    object.trigger(eventName, event);
  }

};

_.each(["Map", "Marker"], function(className) {
  _.extend(google.maps[className].prototype, Backbone.Events);
});