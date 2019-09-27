# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

ActiveRecord::Base.transaction do
  Apartment.delete_all
  User.delete_all
end

admin, realtor, client = User.create!(
  [
    { first_name: 'Leia', last_name: 'Organa', email: 'leia@rebel.com', password: 'testing', role: 0 },
    { first_name: 'Han', last_name: 'Solo', email: 'han@rebel.com', password: 'testing', role: 1 },
    { first_name: 'Chewbacca', email: 'chewey@rebel.com', password: 'testing', role: 2 }
  ]
)

Apartment.create!(
  [
    { name: 'Apartment 1', description: 'Nice apartment', floor_area_size: 100, price_per_month: 400, number_of_rooms: 1, latitude: -16.3942051, longitude: -71.5181323, address: 'Francisco Bolognesi 802', available: true, realtor: realtor },
    { name: 'Apartment 2', description: 'Nice apartment', floor_area_size: 140, price_per_month: 700, number_of_rooms: 2, latitude: -16.3945151, longitude: -71.5179223, address: 'Espinar 1006', available: true, realtor: realtor },
    { name: 'Apartment 3', description: 'Nice apartment', floor_area_size: 240, price_per_month: 600, number_of_rooms: 3, latitude: -16.3942251, longitude: -71.5142251, address: 'New Adress', available: true, realtor: realtor },
    { name: 'Apartment 4', description: 'Nice apartment', floor_area_size: 140, price_per_month: 200, number_of_rooms: 4, latitude: -16.4046551, longitude: -71.546551, address: 'Adress 4', available: true, realtor: realtor },
    { name: 'Apartment 5', description: 'Nice apartment', floor_area_size: 340, price_per_month: 100, number_of_rooms: 5, latitude: -16.4143751, longitude: -71.5148751, address: 'Address 5', available: true, realtor: realtor },
    { name: 'Apartment 6', description: 'Nice apartment', floor_area_size: 140, price_per_month: 900, number_of_rooms: 4, latitude: -16.4048751, longitude: -71.5348751, address: 'Address 5', available: true, realtor: realtor },
    { name: 'Apartment 7', description: 'Nice apartment', floor_area_size: 150, price_per_month: 2000, number_of_rooms: 1, latitude: -16.4048751, longitude: -71.5148751, address: 'Address 5', available: true, realtor: realtor },
    { name: 'Apartment 8', description: 'Nice apartment', floor_area_size: 540, price_per_month: 2100, number_of_rooms: 2, latitude: -16.4142051, longitude: -71.5342051, address: 'Address 5', available: true, realtor: realtor },
    { name: 'Apartment 9', description: 'Nice apartment', floor_area_size: 740, price_per_month: 4000, number_of_rooms: 3, latitude: -16.4145151, longitude: -71.5145151, address: 'Address 5', available: true, realtor: realtor },
    { name: 'Apartment 10', description: 'Nice apartment', floor_area_size: 103, price_per_month: 434, number_of_rooms: 4, latitude: -16.4142251, longitude: -71.5142251, address: 'Address 5', available: true, realtor: realtor },
    { name: 'Apartment 11', description: 'Nice apartment', floor_area_size: 143, price_per_month: 734, number_of_rooms: 5, latitude: -16.4146551, longitude: -71.5246551, address: 'Address 5', available: true, realtor: realtor },
    { name: 'Apartment 12', description: 'Nice apartment', floor_area_size: 243, price_per_month: 634, number_of_rooms: 1, latitude: -16.4148751, longitude: -71.5148751, address: 'Address 5', available: true, realtor: realtor },
    { name: 'Apartment 13', description: 'Nice apartment', floor_area_size: 143, price_per_month: 234, number_of_rooms: 2, latitude: -16.4148851, longitude: -71.5348751, address: 'Address 5', available: true, realtor: realtor },
    { name: 'Apartment 14', description: 'Nice apartment', floor_area_size: 343, price_per_month: 134, number_of_rooms: 3, latitude: -16.3942051, longitude: -71.5142051, address: 'Address 5', available: true, realtor: realtor },
    { name: 'Apartment 15', description: 'Nice apartment', floor_area_size: 143, price_per_month: 934, number_of_rooms: 4, latitude: -16.3945151, longitude: -71.5145151, address: 'Address 5', available: true, realtor: realtor },
    { name: 'Apartment 16', description: 'Nice apartment', floor_area_size: 153, price_per_month: 2034, number_of_rooms: 5, latitude: -16.3942251, longitude: -71.5442251, address: 'Address 5', available: true, realtor: realtor },
    { name: 'Apartment 17', description: 'Nice apartment', floor_area_size: 543, price_per_month: 2134, number_of_rooms: 1, latitude: -16.3946551, longitude: -71.5146551, address: 'Address 5', available: true, realtor: realtor },
    { name: 'Apartment 18', description: 'Nice apartment', floor_area_size: 742, price_per_month: 4034, number_of_rooms: 2, latitude: -16.3948751, longitude: -71.5148751, address: 'Address 5', available: true, realtor: realtor },
    { name: 'Apartment 19', description: 'Nice apartment', floor_area_size: 102, price_per_month: 50, number_of_rooms: 3, latitude: -16.3943751, longitude: -71.5648751, address: 'Address 5', available: true, realtor: realtor },
    { name: 'Apartment 20', description: 'Nice apartment', floor_area_size: 142, price_per_month: 463, number_of_rooms: 4, latitude: -16.3962051, longitude: -71.5162051, address: 'Address 5', available: true, realtor: realtor },
    { name: 'Apartment 21', description: 'Nice apartment', floor_area_size: 242, price_per_month: 763, number_of_rooms: 5, latitude: -16.3965151, longitude: -71.5765151, address: 'Address 5', available: true, realtor: realtor },
    { name: 'Apartment 22', description: 'Nice apartment', floor_area_size: 142, price_per_month: 663, number_of_rooms: 1, latitude: -16.3962251, longitude: -71.5162251, address: 'Address 5', available: true, realtor: realtor },
    { name: 'Apartment 23', description: 'Nice apartment', floor_area_size: 342, price_per_month: 263, number_of_rooms: 2, latitude: -16.3966551, longitude: -71.5666551, address: 'Address 5', available: true, realtor: realtor },
    { name: 'Apartment 24', description: 'Nice apartment', floor_area_size: 142, price_per_month: 163, number_of_rooms: 3, latitude: -16.3968751, longitude: -71.5168751, address: 'Address 5', available: true, realtor: realtor },
    { name: 'Apartment 25', description: 'Nice apartment', floor_area_size: 152, price_per_month: 963, number_of_rooms: 4, latitude: -16.3968751, longitude: -71.5768751, address: 'Address 5', available: true, realtor: realtor },
    { name: 'Apartment 26', description: 'Nice apartment', floor_area_size: 542, price_per_month: 2063, number_of_rooms: 5, latitude: -16.4148751, longitude: -71.5148751, address: 'Address 5', available: true, realtor: realtor },
    { name: 'Apartment 27', description: 'Nice apartment', floor_area_size: 740, price_per_month: 2163, number_of_rooms: 3, latitude: -16.3848751, longitude: -71.5048751, address: 'Address 5', available: true, realtor: realtor },
    { name: 'Apartment 28', description: 'Nice apartment', floor_area_size: 541, price_per_month: 4063, number_of_rooms: 4, latitude: -16.3748751, longitude: -71.5148751, address: 'Address 5', available: true, realtor: realtor }
  ]
)
