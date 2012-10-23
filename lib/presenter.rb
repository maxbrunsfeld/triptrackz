module Presenter
  class << self

    def present(template_name, data)
      json_string = data.to_json
      js_json = "JSON.parse('#{json_string}')"
      js = "presenters.#{template_name}(#{js_json})"
      context.eval(js)
    end

    private

    def context
      js = Rails.application.assets["presenters"].source
      ExecJS.compile(js)
    end

  end
end