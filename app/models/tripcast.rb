class Tripcast < ActiveRecord::Base
  attr_accessible :name, :user_id, :location

  class << self

    def within_box(sw, ne)
      sw_string = "(#{sw.x}, #{sw.y})"
      ne_string = "(#{ne.x}, #{ne.y})"
      box_string = "box '(#{sw_string}, #{ne_string})'"
      where("location <@ #{box_string}")
    end

  end
end