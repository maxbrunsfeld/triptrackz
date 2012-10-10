require "spec_helper"

describe TripcastsController do
  describe "#new" do
    it "sets up a tripcast model" do
      get :new
      assigns[:tripcast].should be_a Tripcast
      response.should be_success
    end
  end

  describe "#create" do
    let(:params) do
      {
        :name => "alissa's tripcast",
        :latitude => 34.0,
        :longitude => -122.0
      }
    end

    let(:user) do
      User.create!({:name => "Hojo", :email => "hojo@example.com"})
    end

    before do
      controller.set_current_user(user)
    end

    it "creates a tripcast with the given parameters" do
      post :create, :tripcast => params

      tripcast = Tripcast.last
      tripcast.name.should == params[:name]
      tripcast.user_id.should == user.id
      tripcast.latitude.should == params[:latitude]
      tripcast.longitude.should == params[:longitude]
    end
  end
end
