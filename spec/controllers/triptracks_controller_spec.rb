require "spec_helper"

describe TriptracksController do
  let(:user) do
    User.create!({:name => "Hojo", :email => "hojo@example.com"})
  end

  before do
    sign_in(user)
  end

  describe "#index" do
    before do
      @triptrack1 = create(:triptrack)
      @triptrack2 = create(:triptrack)
    end

    context "when html is requested" do
      it "renders the page with all triptracks" do
        get :index
        response.should render_template("triptracks/index")
        names = assigns(:triptracks).map(&:name)
        names.should include(@triptrack1.name, @triptrack2.name)
      end
    end

    context "when json is requested" do
      context "when the north south east and west parameters are sent" do
        it "returns the triptracks inside of those boundaries as json" do
          north = 2
          south = -5
          west = -5
          east = 3

          triptrack = create(:triptrack)

          Triptrack.stub(:within_box).
            with(north, south, east, west).
            and_return([triptrack])

          get :index, {
            :format => :json,
            :north => north,
            :south => south,
            :west => west,
            :east => east
          }

          response.body.should == [triptrack].to_json
        end
      end

      context "when the boundary parameters are not provided" do
        it "returns a list of triptracks as json" do
          get :index, {:format => :json}
          json = JSON.parse(response.body)

          names = json.map { |hash| hash["name"] }
          latitudes = json.map { |hash| hash["latitude"] }
          longitudes = json.map { |hash| hash["longitude"] }

          names.should include(@triptrack1.name, @triptrack2.name)
          latitudes.should include(@triptrack1.latitude, @triptrack2.latitude)
          longitudes.should include(@triptrack1.longitude, @triptrack2.longitude)
        end
      end
    end
  end

  describe "#new" do
    it "sets up a triptrack model" do
      get :new
      assigns[:triptrack].should be_a Triptrack
      response.should be_success
    end
  end

  describe "#create" do
    let(:params) do
      {
        :name => "alissa's triptrack",
        :latitude => 34.0,
        :longitude => -122.0
      }
    end

    it "creates a triptrack with the given parameters" do
      post :create, :triptrack => params

      triptrack = Triptrack.last
      triptrack.name.should == params[:name]
      triptrack.user_id.should == user.id
      triptrack.latitude.should == params[:latitude]
      triptrack.longitude.should == params[:longitude]
    end
  end
end
