FixtureBuilder.configure do |fbuilder|
  fbuilder.files_to_check += Dir[
    "spec/support/factories.rb",
    "spec/support/fixture_builder.rb"
  ]

  fbuilder.factory do |f|

    f.name(:dude, FactoryGirl.create(:user))
    f.name(:clip, FactoryGirl.create(:trip))

  end
end