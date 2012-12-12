require "spec_helper"

describe TripsController do
  let(:user) do
    User.create!({:name => "Hojo", :email => "hojo@example.com"})
  end

  before do
    sign_in(user)
  end

  describe "#index" do
    before do
      @trip1 = create(:trip)
      @trip2 = create(:trip)
    end

    context "when html is requested" do
      it "renders the page with all trips" do
        get :index
        response.should render_template("trips/index")
        names = assigns(:trips).map(&:name)
        names.should include(@trip1.name, @trip2.name)
      end
    end

    context "when json is requested" do
      context "when the north south east and west parameters are sent" do
        it "returns the trips inside of those boundaries as json" do
          north = 2
          south = -5
          west = -5
          east = 3

          trip = create(:trip)

          Trip.stub(:within_box).
            with(north, south, east, west).
            and_return([trip])

          get :index, {
            :format => :json,
            :north => north,
            :south => south,
            :west => west,
            :east => east
          }

          response.body.should == [trip].to_json
        end
      end

      context "when the boundary parameters are not provided" do
        it "returns a list of trips as json" do
          get :index, {:format => :json}
          json = JSON.parse(response.body)

          names = json.map { |hash| hash["name"] }
          latitudes = json.map { |hash| hash["latitude"] }
          longitudes = json.map { |hash| hash["longitude"] }

          names.should include(@trip1.name, @trip2.name)
          latitudes.should include(@trip1.latitude, @trip2.latitude)
          longitudes.should include(@trip1.longitude, @trip2.longitude)
        end
      end
    end
  end

  describe "#new" do
    it "sets up a trip model" do
      get :new
      assigns[:trip].should be_a Trip
      response.should be_success
    end
  end

  describe "#create" do
    let(:params) do
      {
        :name => "alissa's trip",
        :latitude => 34.0,
        :longitude => -122.0
      }
    end

    it "creates a trip with the given parameters" do
      post :create, :trip => params

      trip = Trip.last
      trip.name.should == params[:name]
      trip.user_id.should == user.id
      trip.latitude.should == params[:latitude]
      trip.longitude.should == params[:longitude]
    end
  end
end
