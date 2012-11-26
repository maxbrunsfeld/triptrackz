class AddAddressToTriptracks < ActiveRecord::Migration
  def change
    add_column :triptracks, :address, :string
  end
end
