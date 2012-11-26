require "spec_helper"

describe Triptrack do

  describe "#latitude / #longitude" do
    let(:triptrack) do
      build(:triptrack, :name => "fun_triptrack")
    end

    it "reads and writes the x/y coordinate of the location" do
      triptrack.latitude = 34.0
      triptrack.longitude = -122.5

      triptrack.save!
      triptrack.reload

      triptrack.latitude.should == 34.0
      triptrack.longitude.should == -122.5
    end

    it "deals with string coordinates" do
      triptrack.latitude = "34.0"
      triptrack.longitude = "-122.5"

      triptrack.save!
      triptrack.reload

      triptrack.latitude.should == 34.0
      triptrack.longitude.should == -122.5
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

    it "returns the triptracks inside the given box" do
      points.each do |name, point|
        create(:triptrack, :location => point)
      end

      triptracks = Triptrack.within_box(1, -1, 1, -1)

      inside_points = triptracks.map(&:location)

      inside_points.should include(points[:inside])
      inside_points.should_not include(points[:east])
      inside_points.should_not include(points[:north])
      inside_points.should_not include(points[:south])
      inside_points.should_not include(points[:west])
    end
  end

  describe "#as_json" do
    let(:triptrack) { create(:triptrack) }
    subject { triptrack.as_json }

    its(["id"]) { should == triptrack.id }
    its(["name"]) { should == triptrack.name }
    its(["address"]) { should == triptrack.address }
    its(["latitude"]) { should == triptrack.latitude }
    its(["longitude"]) { should == triptrack.longitude }
    its(["description"]) { should == triptrack.description }
    its(["clip_url"]) { should == triptrack.clip.url }

    it "doesn't include all of the file columns related to the clip" do
      clip_related_keys = subject.keys.select { |key| key.include?("clip") }
      clip_related_keys.should =~ ["clip_url"]
    end
  end

end