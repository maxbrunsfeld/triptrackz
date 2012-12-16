# encoding: UTF-8
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

ActiveRecord::Schema.define(:version => 20121213033735) do

  create_table "tracks", :force => true do |t|
    t.integer "soundcloud_id"
    t.integer "triptrack_id"
    t.string  "title"
  end

  create_table "trips", :force => true do |t|
    t.string   "name",              :null => false
    t.integer  "user_id",           :null => false
    t.datetime "created_at",        :null => false
    t.datetime "updated_at",        :null => false
    t.string   "clip_file_name"
    t.string   "clip_content_type"
    t.integer  "clip_file_size"
    t.datetime "clip_updated_at"
    t.text     "description"
  end

  create_table "users", :force => true do |t|
    t.string   "email"
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.string   "provider"
    t.string   "uid"
  end

  create_table "waypoints", :force => true do |t|
    t.integer "trip_id"
    t.string  "address"
    t.point   "location", :limit => nil, :null => false, :srid => 4326
  end

end
