class AddDescriptionToTriptracks < ActiveRecord::Migration
  def change
    add_column :triptracks, :description, :text
  end
end
