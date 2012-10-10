class CreateTripcasts < ActiveRecord::Migration
  def change

    create_table(:tripcasts, { :force => true }) do |t|
      t.string :name, :null => false
      t.integer :user_id, :null => false
      t.point :location, :null => false, :srid => 4326
      t.timestamps
    end

  end
end
