require "spec_helper"

describe TripclipsController do
  describe "#index" do
    before do
      @tripclip1 = Tripclip.create!(
        :name => "cheeto tour",
        :user_id => 1,
        :latitude => 34,
        :longitude => -122
      )
      @tripclip2 = Tripclip.create!(
        :name => "dorito tour",
        :user_id => 1,
        :latitude => 34.2,
        :longitude => -122.2
      )
    end

    context "when html is requested" do
      it "sets up a list of tripclips to be rendered" do
        get :index
        assigns[:tripclips].should == Tripclip.all
        response.should render_template("tripclips/index")
      end
    end

    context "when json is requested" do
      it "returns a list of tripclips as json" do
        get :index, {:format => :json}
        json = JSON.parse(response.body)

        names = json.map {|hash| hash["name"]}
        latitudes = json.map {|hash| hash["latitude"]}
        longitudes = json.map {|hash| hash["longitude"]}

        names.should include(@tripclip1.name, @tripclip2.name)
        latitudes.should include(@tripclip1.latitude, @tripclip2.latitude)
        longitudes.should include(@tripclip1.longitude, @tripclip2.longitude)
      end
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
