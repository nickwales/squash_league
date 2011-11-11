class RenamePlayerdivisionToPlayerdivInMatch < ActiveRecord::Migration
  def self.up
	change_table :matches do |t|
	t.rename :playerdivision_id, :playerdiv_id
	end
  end

  def self.down
        change_table :matches do |t|
        t.rename :playerdivision_id, :playerdiv_id
        end
  end
end
