//= require vendor/underscore
//= require_self
//= require_tree .

presenters = {

  present: function(templateName, data) {
    console.log(data);
    var json = data.map(function(model) {
      return model.attributes;

      console.log("attributes:", model.attributes);
    });

    return presenters[templateName](json);
  }

};