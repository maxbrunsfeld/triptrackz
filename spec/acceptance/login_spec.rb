require_relative "spec_helper"

describe "logging in", :type => :request do
  before do
    log_in("Louie")
  end

  it "directs the user to the trips page" do
    current_path.should == "/trips"
    page.should have_content("Louie")
  end

  describe "logging out" do
    it "directs the user to the login page" do
      click_link "Log out"
      current_path.should == "/login"
    end
  end
end
