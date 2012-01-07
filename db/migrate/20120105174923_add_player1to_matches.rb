class AddPlayer1toMatches < ActiveRecord::Migration
  def self.up
    add_column :matches, :player1, :string
  end

  def self.down
  end
end
