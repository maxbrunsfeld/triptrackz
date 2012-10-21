class AddAddressToTripclips < ActiveRecord::Migration
  def change
    add_column :tripclips, :address, :string
  end
end
