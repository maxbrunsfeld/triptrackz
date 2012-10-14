FactoryGirl.define do

  factory :tripclip do
    user
    name 'John Doe'
    sequence(:latitude) { |i| 34 + (0.1 * i) }
    sequence(:longitude) { |i| -122 + (0.1 * i) }
  end

  factory :user do
    sequence(:name) { |i| "John#{i}" }
    email { "john#{i}@example.com" }
  end

end