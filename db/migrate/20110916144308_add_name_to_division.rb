class AddNameToDivision < ActiveRecord::Migration
  def self.up
	add_column :divisions, :name, :string
  end

  def self.down
	remove_column :divisions, :name, :string
  end
end
