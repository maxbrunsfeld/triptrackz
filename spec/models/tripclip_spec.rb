require "spec_helper"

describe Tripclip do

  describe "#latitude / #longitude" do
    let(:tripclip) do
      build(:tripclip, :name => "fun_tripclip")
    end

    it "reads and writes the x/y coordinate of the location" do
      tripclip.latitude = 34.0
      tripclip.longitude = -122.5

      tripclip.save!
      tripclip.reload

      tripclip.latitude.should == 34.0
      tripclip.longitude.should == -122.5
    end

    it "deals with string coordinates" do
      tripclip.latitude = "34.0"
      tripclip.longitude = "-122.5"

      tripclip.save!
      tripclip.reload

      tripclip.latitude.should == 34.0
      tripclip.longitude.should == -122.5
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

    it "returns the tripclips inside the given box" do
      points.each do |name, point|
        create(:tripclip, :location => point)
      end

      tripclips = Tripclip.within_box(1, -1, 1, -1)

      inside_points = tripclips.map(&:location)

      inside_points.should include(points[:inside])
      inside_points.should_not include(points[:east])
      inside_points.should_not include(points[:north])
      inside_points.should_not include(points[:south])
      inside_points.should_not include(points[:west])
    end
  end

  describe "#as_json" do
    let(:tripclip) { create(:tripclip) }
    subject { tripclip.as_json }

    its(["id"]) { should == tripclip.id }
    its(["name"]) { should == tripclip.name }
    its(["address"]) { should == tripclip.address }
    its(["latitude"]) { should == tripclip.latitude }
    its(["longitude"]) { should == tripclip.longitude }
    its(["description"]) { should == tripclip.description }
    its(["clip_url"]) { should == tripclip.clip.url }

    it "doesn't include all of the file columns related to the clip" do
      clip_related_keys = subject.keys.select { |key| key.include?("clip") }
      clip_related_keys.should =~ ["clip_url"]
    end
  end

end