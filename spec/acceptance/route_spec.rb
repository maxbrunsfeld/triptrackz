require_relative "spec_helper"

describe "picking a route", :type => :request do
  before do
    log_in("Max")
  end

  describe "filling in the route and clicking 'go'", :js => true do
    before do
      within "#route" do
        fill_in "start", :with => "San Francisco, CA"
        fill_in "end", :with => "Los Angeles, CA"
        click_button "Go"
      end
    end

    it "brings up the route on a map"
  end
end
