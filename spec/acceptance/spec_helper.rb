require "spec_helper"
require 'capybara/rspec'

Capybara.javascript_driver = :webkit

helpers = File.expand_path("../helpers", __FILE__)
Dir.glob(helpers + "**/*.rb").each { |f| require f }
