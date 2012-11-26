class RenameTripclipsToTriptracks < ActiveRecord::Migration
  def change
    rename_table :triptracks, :triptracks
  end
end