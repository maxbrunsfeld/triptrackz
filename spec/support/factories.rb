FactoryGirl.define do

  file_fixtures_dir = Rails.root + "spec/file_fixtures"

  factory :trip do
    user
    name { Faker::Lorem.sentence(1) }
    description { Faker::Lorem.sentence(50) }
    clip { File.open(file_fixtures_dir + "empty.mp3") }
  end

  factory :user do
    name { Faker::Name.name }
    email { Faker::Internet.email }
  end

  factory :waypoint do
    latitude { Faker::Address.latitude }
    longitude { Faker::Address.longitude }
    address { Faker::Address.street_address }
  end
end