class RenameTriptracksToTrips < ActiveRecord::Migration
  def change
    rename_table :triptracks, :trips
  end
end