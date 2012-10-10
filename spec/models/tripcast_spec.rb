require "spec_helper"

describe Tripcast do

  describe "#latitude / #longitude" do
    let(:tripcast) do
      Tripcast.new(
        :name => "fun_tripcast",
        :user_id => 1
      )
    end

    it "reads and writes the x/y coordinate of the location" do
      tripcast.latitude.should be_nil
      tripcast.longitude.should be_nil

      tripcast.latitude = 34.0
      tripcast.longitude = -122.5

      tripcast.save!
      tripcast.reload

      tripcast.latitude.should == 34.0
      tripcast.longitude.should == -122.5
    end

    it "deals with string coordinates" do
      tripcast.latitude = "34.0"
      tripcast.longitude = "-122.5"

      tripcast.save!
      tripcast.reload

      tripcast.latitude.should == 34.0
      tripcast.longitude.should == -122.5
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

    it "returns the tripcasts inside the given box" do
      points.each do |name, point|
        Tripcast.create(
          :name => "tripcast_#{name}",
          :user_id => 1,
          :location => point
        )
      end

      sw_corner = Point.from_x_y(-1, -1)
      ne_corner = Point.from_x_y(1, 1)

      tripcasts = Tripcast.within_box(sw_corner, ne_corner)

      inside_points = tripcasts.map(&:location)

      inside_points.should include(points[:inside])
      inside_points.should_not include(points[:east])
      inside_points.should_not include(points[:north])
      inside_points.should_not include(points[:south])
      inside_points.should_not include(points[:west])
    end
  end

end