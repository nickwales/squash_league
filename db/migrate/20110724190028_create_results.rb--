class CreateResults < ActiveRecord::Migration
  def self.up
    create_table :results do |t|
      t.integer :match_id
      t.integer :user_id
      t.integer :score
      t.string :result
      t.string :active

      t.timestamps
    end
  end

  def self.down
    drop_table :results
  end
end
