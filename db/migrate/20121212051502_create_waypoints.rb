class CreateWaypoints < ActiveRecord::Migration
  def change
    create_table :waypoints do |t|
      t.integer :trip_id
      t.string :address
      t.point  :location, :limit => nil, :null => false, :srid => 4326

    end
  end
end
