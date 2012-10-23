//= require vendor/underscore
//= require_self
//= require_tree .

presenters = {

  present: function(templateName, data) {
    var json = data.map(function(model) {
      return model.attributes;
    });

    return presenters[templateName](json);
  }

};