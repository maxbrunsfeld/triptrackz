require "spec_helper"

describe "login", :type => :request do
  before do
    visit "/login"
  end

  it "has links to every login provider" do
    click_link "Test Login"

    fill_in "name", :with => "Louie"
    fill_in "email", :with => "louie@example.com"
    click_button "Sign In"

    current_path.should == "/"
    page.should have_content("Where are you going?")
    page.should have_content("Louie")
  end
end
