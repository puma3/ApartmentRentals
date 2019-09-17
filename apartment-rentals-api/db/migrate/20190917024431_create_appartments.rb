# frozen_string_literal: true

class CreateAppartments < ActiveRecord::Migration[6.0]
  def change
    create_table :appartments do |t|
      t.string :name
      t.string :description
      t.float :floor_area_size
      t.float :price_per_month
      t.integer :number_of_rooms
      t.string :address
      t.float :latitude
      t.float :longitude
      t.boolean :available, default: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
