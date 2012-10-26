FactoryGirl.define do

  file_fixtures_dir = Rails.root + "spec/file_fixtures"

  factory :tripclip do
    user
    name { Faker::Lorem.sentence(1) }
    latitude { Faker::Address.latitude }
    longitude { Faker::Address.longitude }
    address { Faker::Address.street_address }
    description { Faker::Lorem.sentence(50) }
    clip { File.open(file_fixtures_dir + "empty.mp3") }
  end

  factory :user do
    name { Faker::Name.name }
    email { Faker::Internet.email }
  end

end