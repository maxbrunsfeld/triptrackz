class RenameTripclipsToTriptracks < ActiveRecord::Migration
  def change
    rename_table :tripclips, :triptracks
  end
end