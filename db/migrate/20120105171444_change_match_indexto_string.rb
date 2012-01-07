class ChangeMatchIndextoString < ActiveRecord::Migration
  def self.up
    change_table :matches do |t|
          t.change :index, :string
        end
  end

  def self.down
  end
end
