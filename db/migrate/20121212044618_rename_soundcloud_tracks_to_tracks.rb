class RenameTracksToTracks < ActiveRecord::Migration
  def change
    rename_table :soundcloud_tracks, :tracks
  end
end
