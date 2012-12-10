class CreateSoundcloudTracks < ActiveRecord::Migration
  def change
    create_table :soundcloud_tracks do |t|
      t.integer :soundcloud_id
      t.integer :triptrack_id
      t.string :title
    end
  end
end
