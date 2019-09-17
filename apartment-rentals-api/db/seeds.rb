# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

ActiveRecord::Base.transaction do
  User.delete_all
end

User.create!(
  [
    { first_name: 'Leia', last_name: 'Organa', email: 'leia@rebel.com', password: 'testing', role: 0 },
    { first_name: 'Han', last_name: 'Solo', email: 'han@rebel.com', password: 'testing', role: 1 },
    { first_name: 'Chewbacca', email: 'chewey@rebel.com', password: 'testing', role: 2 }
  ]
)
