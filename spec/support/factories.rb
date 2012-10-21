FactoryGirl.define do

  factory :tripclip do
    user
    name { Faker::Lorem.sentence(1) }
    latitude { Faker::Address.latitude }
    longitude { Faker::Address.longitude }
  end

  factory :user do
    name { Faker::Name.name }
    email { Faker::Internet.email }
  end

end