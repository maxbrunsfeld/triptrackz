class RenameTripcastsToTripclips < ActiveRecord::Migration
  def change
    rename_table :tripcasts, :tripclips
  end
end
