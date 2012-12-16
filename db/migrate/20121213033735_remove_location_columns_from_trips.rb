class RemoveLocationColumnsFromTrips < ActiveRecord::Migration
  def change
    remove_column :trips, :location
    remove_column :trips, :address
  end
end
