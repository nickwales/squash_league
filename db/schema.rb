# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20110916144308) do

  create_table "blogs", :force => true do |t|
    t.string   "title"
    t.string   "summary"
    t.string   "contents"
    t.integer  "author"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "divisions", :force => true do |t|
    t.integer  "season_id"
    t.integer  "number"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name"
  end

  create_table "matches", :force => true do |t|
    t.integer  "playerdiv_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "playerdivs", :force => true do |t|
    t.integer  "division_id"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "rankings", :force => true do |t|
    t.integer  "score"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "match_id"
  end

  create_table "results", :force => true do |t|
    t.integer  "match_id"
    t.integer  "user_id"
    t.integer  "score"
    t.string   "result"
    t.string   "active"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "points"
  end

  create_table "seasons", :force => true do |t|
    t.date     "start_date"
    t.date     "end_date"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", :force => true do |t|
    t.string   "name"
    t.string   "email"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "encrypted_password"
    t.string   "salt"
    t.boolean  "admin"
    t.string   "mobile"
    t.string   "twitter"
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true

end
