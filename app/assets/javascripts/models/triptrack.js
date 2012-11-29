models.Triptrack = Backbone.Model.extend({

  url: "/triptracks",

  constructor: function(attrs, options) {
    this.point = new models.Point();
    this.soundcloudTracks = new collections.SoundcloudTracks();
    return models.Triptrack.__super__.constructor.apply(this, arguments);
  },

  set: function(attrs) {
    if (attrs && attrs.latitude) {
      this.point.set({
        address: attrs.address,
        location: new google.maps.LatLng(
          attrs.latitude,
          attrs.longitude
        )
      });

      delete attrs.latitude;
      delete attrs.longitude;
      delete attrs.address;
    }

    return models.Triptrack.__super__.set.apply(this, arguments);
  },

  toJSON: function() {
    return {
      name: this.get("name"),
      latitude: this.point.location().lat(),
      longitude: this.point.location().lng(),
      address: this.point.address(),
      description: this.get("description")
    };
  },

  setFileInput: function(fileInputs) {
    this.fileInput = fileInputs;
  },

  sync: function(method, model, options) {
    var csrf_params = {};
    csrf_params[window.csrf_param] = window.csrf_token;

    _.extend(options, {
      files: this.fileInput,
      iframe: true,
      data: _.extend(model.toJSON(), csrf_params)
    });

    return Backbone.sync.apply(this, arguments);
  }

});