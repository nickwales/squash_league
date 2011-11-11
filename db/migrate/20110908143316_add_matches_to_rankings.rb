class AddMatchesToRankings < ActiveRecord::Migration
  def self.up
    add_column :rankings, :match_id, :integer
  end

  def self.down
    remove_column :rankings, :match_id
  end
end
