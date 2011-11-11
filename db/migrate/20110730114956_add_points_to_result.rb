class AddPointsToResult < ActiveRecord::Migration
  def self.up
    add_column :results, :points, :integer
  end

  def self.down
    remove_column :results, :points
  end
end
