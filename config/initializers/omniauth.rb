Rails.application.config.middleware.use OmniAuth::Builder do
  provider :developer unless Rails.env.production?
  provider :facebook, API_KEYS["facebook"]["key"], API_KEYS["facebook"]["secret"], :scope => 'email'
end