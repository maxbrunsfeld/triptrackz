class AddClipColumnsToTripclips < ActiveRecord::Migration
  def up
    add_attachment :tripclips, :clip
  end

  def down
    remove_attachment :tripclips, :clip
  end
end