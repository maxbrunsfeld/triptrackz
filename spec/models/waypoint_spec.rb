require "spec_helper"

describe Waypoint do
  describe "#latitude / #longitude" do
    let(:waypoint) { build(:waypoint) }

    it "reads and writes the x/y coordinate of the location" do
      waypoint.latitude = 34.0
      waypoint.longitude = -122.5

      waypoint.save!
      waypoint.reload

      waypoint.latitude.should == 34.0
      waypoint.longitude.should == -122.5
    end

    it "deals with string coordinates" do
      waypoint.latitude = "34.0"
      waypoint.longitude = "-122.5"

      waypoint.save!
      waypoint.reload

      waypoint.latitude.should == 34.0
      waypoint.longitude.should == -122.5
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

    it "returns the waypoints inside the given box" do
      points.each do |name, waypoint|
        create(:waypoint, :location => waypoint)
      end

      waypoints = Waypoint.within_box(1, -1, 1, -1)
      waypoints.map(&:location).should == [points[:inside]]
    end
  end

  describe "#as_json" do
    let(:waypoint) { create(:waypoint) }
    subject { waypoint.as_json }

    its(["id"]) { should == waypoint.id }
    its(["address"]) { should == waypoint.address }
    its(["latitude"]) { should == waypoint.latitude }
    its(["longitude"]) { should == waypoint.longitude }
  end
end