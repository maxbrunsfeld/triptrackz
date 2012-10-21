source 'https://rubygems.org'

gem 'rails', '3.2.8'
gem 'activerecord-postgresql-adapter'
gem 'omniauth'
gem 'omniauth-facebook'
gem 'jquery-rails'
gem 'pg'
gem 'spatial_adapter', :git => "git://github.com/Empact/spatial_adapter.git", :require => "spatial_adapter/postgresql"
gem 'smt_rails', :git => 'git://github.com/railsware/smt_rails.git'
gem 'paperclip'

group :test, :development do
  gem 'fixture_builder'
  gem 'factory_girl'
  gem 'rspec'
  gem 'rspec-rails', '~> 2.0'
end

group :test do
  gem 'capybara'
  gem 'capybara-webkit'
  gem 'launchy'
  gem 'faker'
end

group :assets do
  gem 'sass-rails',   '~> 3.2.3'
  gem 'compass-rails'
end