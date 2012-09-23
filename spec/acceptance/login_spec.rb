require "spec_helper"

describe "logging in", :type => :request do
  before do
    log_in("Louie")
  end

  it "directs the user to the home page" do
    current_path.should == "/"
    page.should have_content("Where are you going?")
    page.should have_content("Louie")
  end
end
