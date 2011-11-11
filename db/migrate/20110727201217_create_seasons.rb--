class CreateSeasons < ActiveRecord::Migration
  def self.up
    create_table :seasons do |t|
      t.date :start_date
      t.date :end_date

      t.timestamps
    end
  end

  def self.down
    drop_table :seasons
  end
end
