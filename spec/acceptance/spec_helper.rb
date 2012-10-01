require "spec_helper"
require 'capybara/rspec'

helpers = File.expand_path("../helpers", __FILE__)
Dir.glob(helpers + "**/*.rb").each { |f| require f }
