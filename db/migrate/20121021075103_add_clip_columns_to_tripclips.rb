class AddClipColumnsToTriptracks < ActiveRecord::Migration
  def up
    add_attachment :triptracks, :clip
  end

  def down
    remove_attachment :triptracks, :clip
  end
end