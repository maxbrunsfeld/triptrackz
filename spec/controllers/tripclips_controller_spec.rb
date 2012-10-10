require "spec_helper"

describe TripclipsController do
  describe "#index" do
    it "sets up a list of tripclips to be rendered" do
      2.times do |i|
        Tripclip.create!(
          :name => "tripclip_#{i}",
          :user_id => 1,
          :latitude => 34 + i,
          :longitude => -122 + i
        )
      end

      get :index

      assigns[:tripclips].should == Tripclip.all
    end
  end

  describe "#new" do
    it "sets up a tripclip model" do
      get :new
      assigns[:tripclip].should be_a Tripclip
      response.should be_success
    end
  end

  describe "#create" do
    let(:params) do
      {
        :name => "alissa's tripclip",
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

    it "creates a tripclip with the given parameters" do
      post :create, :tripclip => params

      tripclip = Tripclip.last
      tripclip.name.should == params[:name]
      tripclip.user_id.should == user.id
      tripclip.latitude.should == params[:latitude]
      tripclip.longitude.should == params[:longitude]
    end
  end
end
