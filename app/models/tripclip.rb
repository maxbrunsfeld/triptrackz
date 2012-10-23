class Tripclip < ActiveRecord::Base
  attr_accessible :name, :location, :latitude, :longitude, :clip, :address
  has_attached_file :clip
  belongs_to :user

  class << self

    def within_box(north, south, east, west)
      sw_string = "(#{west}, #{south})"
      ne_string = "(#{east}, #{north})"
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

  def as_json(arg=nil)
    {
      "name" => name,
      "address" => address,
      "latitude" => latitude,
      "longitude" => longitude,
      "id" => id
    }
  end

  private

  def ensure_location
    self.location = Point.new unless location
  end
end