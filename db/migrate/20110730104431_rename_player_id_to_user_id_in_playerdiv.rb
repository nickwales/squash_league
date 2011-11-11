class RenamePlayerIdToUserIdInPlayerdiv < ActiveRecord::Migration
  def self.up
    change_table :playerdivs do |t|
  	t.rename :player_id, :user_id
	end
  end

  def self.down
    change_table :playerdivs do |t|
  	t.rename :user_id, :player_id
	end
  end
end
