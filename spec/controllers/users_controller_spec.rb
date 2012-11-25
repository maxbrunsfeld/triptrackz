require "spec_helper"

describe UsersController do
  let(:user) { create(:user) }

  before do
    sign_in(user)
  end

  describe "#show" do
    it "gets the user" do
      get :show, :id => user.id
      assigns(:user).should == user
    end
  end
end