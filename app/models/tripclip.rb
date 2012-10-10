class Tripclip < ActiveRecord::Base
  attr_accessible :name, :user_id, :location, :latitude, :longitude

  class << self

    def within_box(sw, ne)
      sw_string = "(#{sw.x}, #{sw.y})"
      ne_string = "(#{ne.x}, #{ne.y})"
      box_string = "box '(#{sw_string}, #{ne_string})'"
      where("location <@ #{box_string}")
    end

  end

  def latitude
    location.y if location
  end

  def longitude
    location.x if location
  end

  def latitude=(lat)
    ensure_location
    location.y = lat.to_f
  end

  def longitude=(lng)
    ensure_location
    location.x = lng.to_f
  end

  private

  def ensure_location
    self.location = Point.new unless location
  end
end
