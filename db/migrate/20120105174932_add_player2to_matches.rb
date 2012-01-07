class AddPlayer2toMatches < ActiveRecord::Migration
  def self.up
        add_column :matches, :player2, :string
  end

  def self.down
  end
end
