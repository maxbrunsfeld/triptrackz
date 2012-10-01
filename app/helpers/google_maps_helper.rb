module GoogleMapsHelper
  def google_maps_js_url
    if Rails.env.test?
      "helpers/fake_google"
    else
      "http://maps.googleapis.com/maps/api/js?key=#{API_KEYS["google_maps"]}&sensor=true&libraries=drawing"
    end
  end
end
