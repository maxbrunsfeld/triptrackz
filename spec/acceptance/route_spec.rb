require_relative "spec_helper"

describe "picking a route", :type => :request do
  before do
    log_in("Max")
  end

  it "lets the user define a route" do
    within "#route" do
      fill_in "start", :with => "San Francisco, CA"
      fill_in "end", :with => "Los Angeles, CA"
      click_button "Go"
    end
  end
end
