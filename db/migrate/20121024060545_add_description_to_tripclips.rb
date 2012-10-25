class AddDescriptionToTripclips < ActiveRecord::Migration
  def change
    add_column :tripclips, :description, :text
  end
end
