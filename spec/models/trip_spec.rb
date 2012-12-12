require "spec_helper"

describe Trip do

  describe "#latitude / #longitude" do
    let(:trip) do
      build(:trip, :name => "fun_trip")
    end

    it "reads and writes the x/y coordinate of the location" do
      trip.latitude = 34.0
      trip.longitude = -122.5

      trip.save!
      trip.reload

      trip.latitude.should == 34.0
      trip.longitude.should == -122.5
    end

    it "deals with string coordinates" do
      trip.latitude = "34.0"
      trip.longitude = "-122.5"

      trip.save!
      trip.reload

      trip.latitude.should == 34.0
      trip.longitude.should == -122.5
    end
  end

  describe ".within_box(north, south, east, west)" do
    let(:points) do
      {
        :inside => Point.from_x_y(0, 0),
        :north => Point.from_x_y(0, 2),
        :south => Point.from_x_y(0, -2),
        :east => Point.from_x_y(2, 0),
        :west => Point.from_x_y(-2, 0)
      }
    end

    it "returns the trips inside the given box" do
      points.each do |name, point|
        create(:trip, :location => point)
      end

      trips = Trip.within_box(1, -1, 1, -1)

      inside_points = trips.map(&:location)

      inside_points.should include(points[:inside])
      inside_points.should_not include(points[:east])
      inside_points.should_not include(points[:north])
      inside_points.should_not include(points[:south])
      inside_points.should_not include(points[:west])
    end
  end

  describe "#as_json" do
    let(:trip) { create(:trip) }
    subject { trip.as_json }

    its(["id"]) { should == trip.id }
    its(["name"]) { should == trip.name }
    its(["address"]) { should == trip.address }
    its(["latitude"]) { should == trip.latitude }
    its(["longitude"]) { should == trip.longitude }
    its(["description"]) { should == trip.description }
    its(["clip_url"]) { should == trip.clip.url }

    it "doesn't include all of the file columns related to the clip" do
      clip_related_keys = subject.keys.select { |key| key.include?("clip") }
      clip_related_keys.should =~ ["clip_url"]
    end
  end

end