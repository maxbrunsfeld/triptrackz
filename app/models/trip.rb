class Trip < ActiveRecord::Base
  attr_accessible :name, :clip, :description
  has_attached_file :clip
  belongs_to :user

  def self.within_box(north, south, east, west)
    []
  end

  def as_json(arg=nil)
    {
      "id" => id,
      "name" => name,
      "description" => description
    }
  end
end