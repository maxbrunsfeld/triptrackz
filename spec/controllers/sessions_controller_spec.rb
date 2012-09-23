require "spec_helper"

describe SessionsController do
  describe "#create" do
    context "when a user with the given credentials already exists" do
      before do
        user = User.create({
          "provider" => "facebook",
          "name" => "John Doe",
          "email" => "john@example.com",
          "uid" => "1234"
        })
      end

      it "logs the person in as that user" do
        post :create, {
          "provider" => "facebook",
          "name" => "John Doe",
          "email" => "john@example.com",
          "uid" => "1234"
        }

        controller.current_user.should == nil
      end
    end

    context "when a user with the given credentials does not exist" do
      it "creates a user with those credentials and logs them in" do
        post :create, {
          "provider" => "facebook",
          "name" => "John Doe",
          "email" => "john@example.com",
          "uid" => "1234"
        }

        user = User.where({
          "provider" => "facebook",
          "name" => "John Doe",
          "email" => "john@example.com",
          "uid" => "1234"
        }).first

        user.should_not be_nil
        controller.current_user.should == user
      end
    end

    it "redirects the user to the home page" do
      post :create, {
        "provider" => "facebook",
        "name" => "John Doe",
        "email" => "john@example.com",
        "uid" => "1234"
      }

      response.should redirect_to "/"
    end
  end
end