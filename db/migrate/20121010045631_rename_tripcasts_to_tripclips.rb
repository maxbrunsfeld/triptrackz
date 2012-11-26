class RenameTripcastsToTriptracks < ActiveRecord::Migration
  def change
    rename_table :tripcasts, :triptracks
  end
end
