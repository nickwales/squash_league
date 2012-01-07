class AddIndexToMatches < ActiveRecord::Migration
  def self.up
	add_column :matches, :index, :integer
  end

  def self.down
  end
end
