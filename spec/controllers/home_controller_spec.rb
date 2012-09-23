require "spec_helper"

describe HomeController do
  describe "#index" do
    context "when the user is logged in" do
      before do
        user = User.create({
          "uid" => "asdfadsf",
          "provider" => "facebook"
        })
        controller.set_current_user(user)
      end

      it "succeeds" do
        get :index
        response.should be_success
      end
    end

    context "when the user is NOT logged in" do
      it "redirects to the login page" do
        get :index
        response.should redirect_to "/login"
      end
    end
  end
end
