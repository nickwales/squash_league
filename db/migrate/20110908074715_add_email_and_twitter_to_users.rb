class AddEmailAndTwitterToUsers < ActiveRecord::Migration
  def self.up
    add_column :users, :mobile, :string
    add_column :users, :twitter, :string
  end

  def self.down
    remove_column :users, :twitter
    remove_column :users, :mobile
  end
end
