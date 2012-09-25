require "spec_helper"

describe SessionsController do
  describe "#create" do
    let(:old_attrs) do
      {
        "provider" => "facebook",
        "uid" => "1234",
        "name" => "John Doe",
        "email" => "john@example.com"
      }
    end

    let(:new_attrs) do
      old_attrs.merge(
        "name" => "Jonathan Doe",
        "email" => "john@example2.com"
      )
    end

    context "when a user with the given credentials already exists" do
      let!(:user) { User.create(old_attrs) }

      before do
        post :create, new_attrs
      end

      it "updates their name and email" do
        user.reload
        user.name.should == new_attrs["name"]
        user.email.should == new_attrs["email"]
      end

      it "logs the person in as that user" do
        controller.current_user.should == user
      end
    end

    context "when a user with the given credentials does not exist" do
      it "creates a user with those credentials and logs them in" do
        post :create, old_attrs
        user = User.where(old_attrs).first
        user.should_not be_nil
        controller.current_user.should == user
      end
    end

    it "redirects the user to the home page" do
      post :create, old_attrs
      response.should redirect_to "/"
    end
  end

  describe "#destroy" do
    it "logs the user out" do
      user = User.create!({:name => "Hojo", :email => "hojo@example.com"})
      controller.set_current_user(user)
      controller.current_user.should_not be_nil
      delete :destroy
      controller.current_user.should be_nil
    end

    it "redirects the user to the home page" do
      delete :destroy
      response.should redirect_to "/login"
    end
  end
end