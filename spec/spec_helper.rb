ENV["RAILS_ENV"] ||= 'test'
require_relative "../config/environment"
require 'rspec/rails'
require 'rspec/autorun'

Dir.glob(Rails.root + 'spec/support/**/*.rb').each { |f| require f }

RSpec.configure do |config|
  config.use_transactional_fixtures = true
  config.fixture_path = Rails.root + "spec/fixtures"
  config.infer_base_class_for_anonymous_controllers = false
  config.include FactoryGirl::Syntax::Methods

  config.include ControllerHelpers
end
