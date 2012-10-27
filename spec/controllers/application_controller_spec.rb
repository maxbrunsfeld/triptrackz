require "spec_helper"

describe ApplicationController do
  fixtures :users

  controller do
    def index
      head :ok
    end
  end

  describe "when the user is not logged in" do
    it "redirects them to the login page" do
      get :index
      response.should redirect_to("/login")
    end
  end

  describe "when the user is logged in" do
    before do
      controller.set_current_user(users(:dude))
    end

    it "does not redirect them" do
      get :index
      response.should be_success
    end
  end
end