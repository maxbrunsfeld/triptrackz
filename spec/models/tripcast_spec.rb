require "spec_helper"

describe Tripcast do

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