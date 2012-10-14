FixtureBuilder.configure do |fbuilder|
  fbuilder.files_to_check += Dir[
    "spec/support/factories.rb",
    "spec/support/fixture_builder.rb"
  ]

  fbuilder.factory do

    FactoryGirl.create(:user)
    FactoryGirl.create(:tripclip)

  end
end