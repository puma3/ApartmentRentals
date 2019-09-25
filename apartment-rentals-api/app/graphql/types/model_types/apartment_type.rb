# frozen_string_literal: true

module Types
  class ApartmentType < Types::BaseObject
    field :name, String, null: true
    field :description, String, null: true
    field :floor_area_size, Float, null: true
    field :number_of_rooms, Int, null: true
    field :address, String, null: true
    field :latitude, Float, null: true
    field :longitude, Float, null: true
    field :available, Boolean, null: true
    field :realtor, Types::UserType, null: true
  end
end
