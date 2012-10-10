require "spec_helper"

describe Tripclip do

  describe "#latitude / #longitude" do
    let(:tripclip) do
      Tripclip.new(
        :name => "fun_tripclip",
        :user_id => 1
      )
    end

    it "reads and writes the x/y coordinate of the location" do
      tripclip.latitude.should be_nil
      tripclip.longitude.should be_nil

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

  describe ".within_box(southwest, northeast)" do
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
        Tripclip.create(
          :name => "tripclip_#{name}",
          :user_id => 1,
          :location => point
        )
      end

      sw_corner = Point.from_x_y(-1, -1)
      ne_corner = Point.from_x_y(1, 1)

      tripclips = Tripclip.within_box(sw_corner, ne_corner)

      inside_points = tripclips.map(&:location)

      inside_points.should include(points[:inside])
      inside_points.should_not include(points[:east])
      inside_points.should_not include(points[:north])
      inside_points.should_not include(points[:south])
      inside_points.should_not include(points[:west])
    end
  end

end